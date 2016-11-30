//libraries and utilities
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/*******************************************************************************
 *
 *   1. connectAndMap
 *   2. runInterval
 */

/*******************************************************************************
 *  1. connectAndMap
 *
 *
 * returns specific parts of your store as well as actionCreators bound with dispatch
 * 
 * dataCodes: an array of dataCode strings that references which part of the store to connect the component to - default is null
 * actionCreators: an object containing functions that will be connected to the component, and have dispatch bound to them - default is null
*/
var connectAndMap = ( dataCodes, actionCreators ) => connect(
    dataCodes
    ? ( state ) => 
         { 
            let newProps = {};
            for ( let dataCode in dataCodes ){

                let codes = dataCodes[ dataCode ].split( '.' );

                let data = state[ codes[ 0 ] ];

                for( let i = 1; i < codes.length; i ++ ){
                    data = data[ codes[ i ] ];
                }

                newProps[ codes[ codes.length - 1 ] ] = data;

            }
            return newProps;
        } 
    : null,
    actionCreators
    ? ( dispatch ) => bindActionCreators( actionCreators, dispatch )
    : null,
    null,
    { pure: true }
)

/*******************************************************************************
 *  2. runInterval
 *
 *
 * typically used with componentDidMount lifecycle method, when you need to animate a ref based on it's DOM property. 
 * there are milliseconds inbetween when the component mounts and the ref DOM properties are available for referece, so runInterval will help
 * us keep checking if the DOM property is there before we run our functionality
 *
 * func: the function to run once the conditions in the conditionsFunc return true
 * conditionsFunc: the function to be run until elCheck is true ( required )
 * ms: milliseconds ( optional | default = 100 )
*/
let runInterval = ( func, conditionsFunc, ms ) => { 
    let runInterval = setInterval( function () {
        let condition = true;
        let conditions = conditionsFunc();
        for( let l in conditions ){
            if( !conditions[ l ] ){
                condition = false; 
            }
        }
        if( condition ){
            func();
            clearInterval( runInterval );
        }
        setTimeout( function(){
            clearInterval( runInterval );
        }, 2000 )
    }, ms || 100 );
}

export{
    connectAndMap as connectAndMap,
    runInterval as runInterval
}