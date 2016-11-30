var webpack = require('webpack');
var config = require('./webpack.config.js');
var webpackDevMiddleware = require('webpack-dev-middleware');
var compiler = webpack(config);
var express = require('express');
var bodyParser = require("body-parser");
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var request = require('request');
var _ = require('lodash');

var LOCAL_PATH = 'localhost';

const ROOT_PATH = path.resolve(__dirname);

var cookieJar = request.jar();

var requestOptions = {
    jar:true,
    headers:{
        'Access-Control-Allow-Origin':'*',
        'Authenticate': false
    }
};

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
    next(err);
};

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
};

var app = express();

app.use( '/tvwall-recog', express.static( ROOT_PATH ) );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(errorHandler);

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    next();
});
app.use(cookieParser());
app.enable('trust proxy');


proxy.on('proxyReq', function(proxyReq, req, res, options) {
    console.log('proxy request');
});

proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});

app.listen(8080, LOCAL_PATH, function(err, result){
    if(err){
        console.log(err);
    }

    console.log('server listening at ' + LOCAL_PATH + ':8080');
});
