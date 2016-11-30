//lib and utils
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
//Store
import { AppStore } from './app-store';
//utils
import { connectAndMap } from 'utils/utils';
import 'utils/mock-feeds.js';
//action-creators
import { getAppData, getViewportSize } from './app-actions-reducers';
//Global Components
import Header from './header/header';
import Nav from './nav/nav';
import Footer from './footer/footer';

class AppProvider extends React.Component{
    render () {
        return (
            <Provider store={ AppStore }>
                <App />
            </Provider>
        )
    }
}

let App = connectAndMap(
    [ 'app' ],
    {
        getAppData,
        getViewportSize,
    }
)(
    class extends React.Component {

        constructor(props){
            super(props);
            this.state = { 
                products: [],
                dataLoaded: false
            };
        }

        componentWillMount(){
            this.props.getViewportSize();
            this.props.getAppData();
        }


        componentWillReceiveProps( nextProps ){
         if ( nextProps.app && typeof nextProps.app.data != "undefined" && nextProps.app.data.length ) {
            this.setState({"products": nextProps.app.data, "dataLoaded": true});
         }
        }

        render(){

        let{
            app: { 
                viewportWidth, viewportHeight, loading,
                loaded: { appData, appDataLoaded = appData }
            }
        } = this.props;

            return(
                <div>
                  <Header />
                  <Nav products={this.state.products}/>
                  <Footer />
                </div>
            )
        }
    }
);

let appRoot = document.getElementById( 'app-root' );
render(
    <AppProvider />,
    appRoot
);
