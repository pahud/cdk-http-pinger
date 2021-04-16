# API Reference

**Classes**

Name|Description
----|-----------
[Pinger](#cdk-http-pinger-pinger)|*No description*


**Structs**

Name|Description
----|-----------
[PingerProps](#cdk-http-pinger-pingerprops)|*No description*



## class Pinger  <a id="cdk-http-pinger-pinger"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Pinger(scope: Construct, id: string, props: PingerProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[PingerProps](#cdk-http-pinger-pingerprops)</code>)  *No description*
  * **url** (<code>string</code>)  *No description* 
  * **entry** (<code>string</code>)  optional entry file. __*Optional*__
  * **parameter** (<code>Map<string, string></code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**body** | <code>string</code> | <span></span>
**htmlTitle** | <code>string</code> | <span></span>
**httpStatus** | <code>string</code> | <span></span>
**resource** | <code>[CustomResource](#aws-cdk-core-customresource)</code> | <span></span>
**url** | <code>string</code> | <span></span>



## struct PingerProps  <a id="cdk-http-pinger-pingerprops"></a>






Name | Type | Description 
-----|------|-------------
**url** | <code>string</code> | <span></span>
**entry**? | <code>string</code> | optional entry file.<br/>__*Optional*__
**parameter**? | <code>Map<string, string></code> | __*Optional*__



