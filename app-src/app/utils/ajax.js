import $ from 'jquery';
import { TYPEs as APP_TYPEs } from 'app/app-actions-reducers';

export default function( opts ) {

    opts.type === 'GET' ? null : opts.data = JSON.stringify( opts.data );
    console.log( opts );

    $.ajax({
        url: opts.url,
        method: opts.type,
        data: opts.data,
        dataType: opts.dataType || 'json',
        contentType: 'application/json'
    })
    .done( function( data, textStatus, jqXHR ) {
        if ( typeof opts.success === 'function' ) {
            opts.success( data );
        } else {
            console.warn( 'Ajax call expected callback function, instead received', opts.success );
        }
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {
        var failObj = {
            jqXHR: jqXHR,
            textStatus: textStatus,
            errorThrown: errorThrown,
            url: url
        };

        if ( opts.fail ) {
            opts.fail( failObj );
        } else {
            console.log( 'Failure info:', failObj );
        }
    });
};

export var loading = ( type ) => {
    return {
        type: APP_TYPEs.DATA_LOADING,
        loading: type
    }
}

export var loaded = ( type ) => {
    return {
        type: APP_TYPEs.DATA_LOADED,
        loaded: type
    }
}

export var loadingError = ( type, error ) => {
    return {
        type: APP_TYPEs.DATA_LOADING_ERROR,
        loadingError: type,
        error: error
    }
}
