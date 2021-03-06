marchio-lambda-delete
==
REST DELETE from DynamoDB via Lambda
--

<p align="left">
  <a href="https://travis-ci.org/mitchallen/marchio-lambda-delete">
    <img src="https://img.shields.io/travis/mitchallen/marchio-lambda-delete.svg?style=flat-square" alt="Continuous Integration">
  </a>
  <a href="https://codecov.io/gh/mitchallen/marchio-lambda-delete">
    <img src="https://codecov.io/gh/mitchallen/marchio-lambda-delete/branch/master/graph/badge.svg" alt="Coverage Status">
  </a>
  <a href="https://npmjs.org/package/marchio-lambda-delete">
    <img src="http://img.shields.io/npm/dt/marchio-lambda-delete.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/marchio-lambda-delete">
    <img src="http://img.shields.io/npm/v/marchio-lambda-delete.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/marchio-lambda-delete">
    <img src="https://img.shields.io/github/license/mitchallen/marchio-lambda-delete.svg" alt="License"></a>
  </a>
</p>

## Installation

    $ npm init
    $ npm install marchio-lambda-delete --save
  
* * *

## Lambda Setup

### References

* __[marchio-lambda-post](https://www.npmjs.com/package/marchio-lambda-post)__
* __[marchio-lambda-get](https://www.npmjs.com/package/marchio-lambda-get)__
* __[marchio-lambda-put](https://www.npmjs.com/package/marchio-lambda-put)__
* __[marchio-lambda-patch](https://www.npmjs.com/package/marchio-lambda-patch)__

* __[Create an API with Lambda Proxy Integration through a Proxy Resource](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html)__
* [A Lambda Function in Node.js for Proxy Integration](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html#api-gateway-proxy-integration-lambda-function-nodejs)
* [Build an API Gateway API Using Proxy Integration and a Proxy Resource](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy.html)
* [Create and Test an API with HTTP Proxy Integration through a Proxy Resource](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-http.html)

* * *

### Steps

#### Create Test Role

* Browse to: https://console.aws.amazon.com/iam/
* Click: __Roles__ (from the left column)
* Click: __Create new role__
* __Step 1: Select role type__
 * Expand Section: __AWS Service Role__
 * For __AWS Lambda__, click: __Select__
* __Step 2__ is automatically skipped
* __Step 3: Attach policy__
 * Select both __AmazonDynamoDB*__ policies
* Click: __Next Step__
* Create a name for the role (like __lambda-db-delete__)
* Click: __Create role__

#### Create Lambda Function

* Browse to: https://console.aws.amazon.com/lambda
* Click: __Create a Lambda Function__
* Select: __Blank Function__
* Click: __Next__
* Name: __marchio-delete__
* Description: __Marchio service__
* Runtime: __Node.js 4.3__
* Set the __Role__
 * Role: __Choose and existing role__
 * Existing role: __service-role/__(name of role you created earlier)
* Click: __Next__
* Click: __Create Function__

#### Setup API Gateway

* Browse to: https://console.aws.amazon.com/apigateway
* Click: __Create API__
* Select: __New API__
* API name: __marchio-delete__
* Description: __Marchio service__
* Click: __Create API__
* Click on the slash (__/__)
* Drop down: __Actions__
* Select: __Create Resource__
* Check: __Configure as proxy resource__
* (Optionally enabled __CORS__)
* Click: __Create Resource__
* For __Integration type__ select: __Lambda Function Proxy__
* Lambda Region: For example: __us-east-1__
* Lambda Function: __marchio-delete__
* Click: __Save__
* Add Permission to Lambda Function: __OK__
* Drop down: __Actions__
* Select: __Deploy API__
* Define a new stage (call it "test")
* Click: __Deploy__
* Save the __Invoke URL__

#### Create DynamoDB Table

If you've already setup a demo for __[marchio-lambda-post](https://www.npmjs.com/package/marchio-lambda-post)__ then you may have this table already.  If not, create it and load it with a few test records.

* Browse to: https://console.aws.amazon.com/dynamodb/
* Click: __Create Table__
* Table name: __mldb__
* Primary key: __eid__
* The type should be the default (string)
* Click: __Create__
* After some churning, click the __Capacity__ tab
* Set the __Read / Write capacity units__ to __1__ to save money while testing
* Click: __Save__

#### Example and Deploy

See the deployment example located in the repo under:

* examples/deploy

It contains a deployment script and an example lambda source file.

* Install the dependencies by running:
```
$ npm install
```

To run the script you must first make it runnable:
```
$ chmod +x deploy-lambda.sh
```

To test:

* Deploy the API via API Gateway
* Create an environment variable called __AWS\_HOST\_MARCHIO\_DELETE__ which is set to the invocation url
* Test the deployment using __curl__ (substitute a valid __eid__ value):

```
$ curl -i -X DELETE -H "Accept: applications/json" \
  $AWS_HOST_MARCHIO_DELETE/test/marchio-delete/110ec58a-a0f2-4ac4-8393-c866d813b8d1
```
* The response should contain a 204 status code.

### Partition / Sort Tables

For DynamoDB tables where you have a partition and a sort key append the sort value to the URL:

```
$ curl -i -X DELETE -H "Accept: applications/json" \
  $AWS_HOST_MARCHIO_DELETE_SORT/test/marchio-delete/mldb-sort/110ec58a-a0f2-4ac4-8393-c866d813b8d1/record-sort-key
```

* * *

## Modules

<dl>
<dt><a href="#module_marchio-lambda-delete">marchio-lambda-delete</a></dt>
<dd><p>Module</p>
</dd>
<dt><a href="#module_marchio-lambda-delete-factory">marchio-lambda-delete-factory</a></dt>
<dd><p>Factory module</p>
</dd>
</dl>

<a name="module_marchio-lambda-delete"></a>

## marchio-lambda-delete
Module

<a name="module_marchio-lambda-delete-factory"></a>

## marchio-lambda-delete-factory
Factory module

<a name="module_marchio-lambda-delete-factory.create"></a>

### marchio-lambda-delete-factory.create(spec) ⇒ <code>Promise</code>
Factory method 
It takes one spec parameter that must be an object with named parameters

**Kind**: static method of <code>[marchio-lambda-delete-factory](#module_marchio-lambda-delete-factory)</code>  
**Returns**: <code>Promise</code> - that resolves to {module:marchio-lambda-delete}  

| Param | Type | Description |
| --- | --- | --- |
| spec | <code>Object</code> | Named parameters object |
| spec.event | <code>Object</code> | Lambda event |
| spec.context | <code>Object</code> | Lambda context |
| spec.callback | <code>function</code> | Lambda callback |
| spec.model | <code>Object</code> | Table model |

**Example** *(Usage example)*  
```js
// Lambda root file
"use strict";

var mlFactory = require('marcio-lambda-delete'); 

exports.handler = function(event, context, callback) {

    var model = {
        name: 'mldb',   // must match DynamoDB table name
        partition: 'eid', // primary partition key - cannot be reserved word (like uuid)
        // sort: 'gid',  // primary sort key
        fields: {
            eid:      { type: String },  // primary partition key
            // gid:      { type: String },  // primary sort key           
            email:    { type: String, required: true },
            status:   { type: String, required: true, default: "NEW" },
            // Password will be (fake) hashed by filter before being saved
            password: { type: String, select: false },  // select: false, exclude from query results
        }
    };

    mlFactory.create({ 
        event: event, 
        context: context,
        callback: callback,
        model: model
    })
    .catch(function(err) {
        callback(err);
    });
 };
```

* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/marchio-lambda-delete.git](https://bitbucket.org/mitchallen/marchio-lambda-delete.git)
* [github.com/mitchallen/marchio-lambda-delete.git](https://github.com/mitchallen/marchio-lambda-delete.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.3.2

* updated test cases

#### Version 0.3.1

* updated deploy example with latest package

#### Version 0.3.0

* removed model/table name from url

#### Version 0.2.1

* updated example and doc

#### Version 0.2.0

* change model.primary to model.partition
* add support for sort key

#### Version 0.1.0 

* initial release

* * *
