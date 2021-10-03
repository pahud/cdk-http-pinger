# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### Pinger <a name="cdk-http-pinger.Pinger"></a>

#### Initializers <a name="cdk-http-pinger.Pinger.Initializer"></a>

```typescript
import { Pinger } from 'cdk-http-pinger'

new Pinger(scope: Construct, id: string, props: PingerProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-http-pinger.Pinger.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-http-pinger.Pinger.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-http-pinger.Pinger.parameter.props"></a>

- *Type:* [`cdk-http-pinger.PingerProps`](#cdk-http-pinger.PingerProps)

---



#### Properties <a name="Properties"></a>

##### `body`<sup>Required</sup> <a name="cdk-http-pinger.Pinger.property.body"></a>

```typescript
public readonly body: string;
```

- *Type:* `string`

---

##### `htmlTitle`<sup>Required</sup> <a name="cdk-http-pinger.Pinger.property.htmlTitle"></a>

```typescript
public readonly htmlTitle: string;
```

- *Type:* `string`

---

##### `httpStatus`<sup>Required</sup> <a name="cdk-http-pinger.Pinger.property.httpStatus"></a>

```typescript
public readonly httpStatus: string;
```

- *Type:* `string`

---

##### `resource`<sup>Required</sup> <a name="cdk-http-pinger.Pinger.property.resource"></a>

```typescript
public readonly resource: CustomResource;
```

- *Type:* [`@aws-cdk/core.CustomResource`](#@aws-cdk/core.CustomResource)

---

##### `url`<sup>Required</sup> <a name="cdk-http-pinger.Pinger.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* `string`

---


## Structs <a name="Structs"></a>

### PingerProps <a name="cdk-http-pinger.PingerProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { PingerProps } from 'cdk-http-pinger'

const pingerProps: PingerProps = { ... }
```

##### `url`<sup>Required</sup> <a name="cdk-http-pinger.PingerProps.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* `string`

---



