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


* [marchio-lambda-delete](#module_marchio-lambda-delete)
    * [.package()](#module_marchio-lambda-delete+package)
    * [.health()](#module_marchio-lambda-delete+health)

<a name="module_marchio-lambda-delete+package"></a>

### marchio-lambda-delete.package()
Returns the package name

**Kind**: instance method of <code>[marchio-lambda-delete](#module_marchio-lambda-delete)</code>  
<a name="module_marchio-lambda-delete+health"></a>

### marchio-lambda-delete.health()
Health check

**Kind**: instance method of <code>[marchio-lambda-delete](#module_marchio-lambda-delete)</code>  
**Example** *(Usage Example)*  
```js
                var factory = require("marchio-lambda-delete");
             
                factory.create({})
                .then(function(obj) {
                    return obj.health();
                })
                .then(function(result) {
                    console.log("HEALTH: ", result);
                })
                .catch( function(err) { 
                    console.error(err); 
                });
```
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

**Example** *(Usage example)*  
```js
    var factory = require("marchio-lambda-delete");
 
    factory.create({})
    .then(function(obj) {
        return obj.health();
    })
    .catch( function(err) { 
        console.error(err); 
    });
```
