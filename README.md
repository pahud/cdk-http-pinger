[![NPM version](https://badge.fury.io/js/cdk-http-pinger.svg)](https://badge.fury.io/js/cdk-http-pinger)
[![PyPI version](https://badge.fury.io/py/cdk-http-pinger.svg)](https://badge.fury.io/py/cdk-http-pinger)
![Release](https://github.com/pahud/cdk-http-pinger/workflows/Release/badge.svg?branch=main)

# `cdk-http-pinger`

HTTP Pinger for AWS CDK

# Sample

```ts
import { Pinger } from 'cdk-http-pinger';

const app = new App();

const stack = new Stack(app, 'my-stack');

const pinger = new Pinger(stack, 'Pinger', { url: 'https://aws.amazon.com' });

new CfnOutput(stack, 'HttpStatus', { value: pinger.httpStatus });
new CfnOutput(stack, 'HtmlTitle', { value: pinger.htmlTitle });
new CfnOutput(stack, 'URL', { value: pinger.url });
new CfnOutput(stack, 'Body', { value: pinger.body });
```
