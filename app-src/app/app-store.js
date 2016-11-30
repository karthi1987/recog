// redux to create the store
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
//middlewares
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
// reducers
import app from './app-actions-reducers.js';
import header from './header/header-actions-reducers.js';
import nav from './nav/nav-actions-reducers.js';

let appReducers = combineReducers({
    app,
    header,
    nav
});

/*
 * thunk is a required middleware for the app
 */
const middlewares = [ thunk ];

/*
 * if we are running npm run prod, we do not add the createLogger middleware
 * createLogger will run in debug mode on pprd or qa,
 * just append ?debug=y to the url
 */
if ( process.env.NODE_ENV !== 'production' ) {
  const logger = createLogger();
  middlewares.push( logger );
}

let AppStore = createStore(
    appReducers,
    compose(
        applyMiddleware( ...middlewares ),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
);

export{
    AppStore as AppStore
}