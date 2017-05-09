/**
    Module: db-delete.js
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

const doc = require('dynamodb-doc'),
    docClient = doc ? new doc.DynamoDB() : null,
    path = '/:model/:id';  

module.exports.create = ( spec ) => {

    spec = spec || {};

    const adapter = spec.adapter,
          marchio = spec.marchio;

    const model = marchio.model;

    const query = adapter.query,
          params = adapter.params,
          method = adapter.method,
          body = adapter.body,
          res = adapter.response,
          env = adapter.env;

    const primaryKey = model.primary,
          jsonp = query.jsonp || false,
          cb = query.cb || 'callback';

    var recMgr = null,
        idMgr = null,
        eMsg = '';

    var req = {
        method: method,
        query: query,
        params: params,
        body: body
    };

    var _code = 204;
    var _headers = {
        "Content-Type" : "application/json"
    };

    if(method !== 'DELETE') {
        var resObject = {
            statusCode: 405,
            headers: {
                "Content-Type": "application/json",
                "x-marchio-http-method": method,
                "x-marchio-error": "HTTP Method not supported"
            },
            body: {} 
        };
        res.json(resObject);
        return;
    }

    // TODO - check primaryKey against DynamoDB reserved words
    if(!primaryKey) {
        throw new Error('dp-delete: model.primary not defined.');
    }

    var _key = {};
    const dbId = params.id;
    if(!dbId) {
        return Promise.reject(404);
    }

    _key[ primaryKey ] = dbId; 

    var deleteObject = {
        "TableName": model.name,
        "Key": _key
    };

    return Promise.all([
            docClient.deleteItem( deleteObject ).promise(),
            Promise.resolve( dbId )
        ])
    .then( (o) => {
        var data = o[0],
            dbId = o[1];
        var resObject = {
            statusCode: 204,  
            headers: {
                "Content-Type" : "application/json",
                "Location": "/" + [ model.name, dbId ].join('/')
            },
            body: {}
        };
        res
            .json(resObject);
    })
    .catch( (err) => {  
        if(err) {
            if( err === 404 ) {
                res.json({
                    statusCode: 404
                });
            } else {
                res.json({
                    statusCode: 500,
                    body: { 
                        message: err.message, 
                        err: err
                    }
                });
            }
        } 
    });
};