"use strict";

module.exports.create = (spec) => {

    spec = spec || {};

    return [
        { 
            key: "AWS",
            service: "aws lambda",
            table: "mldb",  // DynamoDB table
            testPostHost: process.env.AWS_HOST_MARCHIO, 
            testPostPath: "/test/marchio",
            testGetHost: process.env.AWS_HOST_MARCHIO_GET, 
            testGetPath: "/test/marchio-get",
            testDeleteHost: process.env.AWS_HOST_MARCHIO_DELETE, 
            testDeletePath: "/test/marchio-delete"    
        }
    ];
}