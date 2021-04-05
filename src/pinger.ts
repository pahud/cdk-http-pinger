import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as logs from '@aws-cdk/aws-logs';
import { App, Construct, Stack, CustomResource, CfnOutput } from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

export interface PingerProps {
  readonly parameter?: { [key: string]: string };
  readonly url: string;
}

export class Pinger extends Construct {
  readonly resource: CustomResource;
  readonly httpStatus: string;
  readonly htmlTitle: string;
  readonly url: string;
  readonly body: string;
  constructor(scope: Construct, id: string, props: PingerProps) {
    super(scope, id);

    this.url = props.url;
    const onEvent = new NodejsFunction(this, 'ProviderFunc', {
      entry: path.join(__dirname, '../src/lambda/index.ts'),
      handler: 'onEvent',
      runtime: lambda.Runtime.NODEJS_14_X,
      bundling: {
        define: {
          'process.env.PARAMETER': jsonStringifiedBundlingDefinition(props.parameter ?? {}),
        },
      },
    });

    const myProvider = new cr.Provider(this, 'Provider', {
      onEventHandler: onEvent,
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    const pingerResource = new CustomResource(this, 'PingerResource', {
      serviceToken: myProvider.serviceToken,
      resourceType: 'Custom::Pinger',
      properties: {
        url: props.url,
      },
    });
    this.resource = pingerResource;
    this.httpStatus = pingerResource.getAtt('status').toString();
    this.htmlTitle = pingerResource.getAtt('title').toString();
    this.body = pingerResource.getAtt('body').toString();
  }
}

function jsonStringifiedBundlingDefinition(value: any): string {
  return JSON.stringify(value)
    .replace(/"/g, '\\"')
    .replace(/,/g, '\\,');
}

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

const stack = new Stack(app, 'my-stack-dev6', { env: devEnv });

const pinger = new Pinger(stack, 'Pinger', { url: 'https://aws.amazon.com' });

new CfnOutput(stack, 'HttpStatus', { value: pinger.httpStatus });
new CfnOutput(stack, 'HtmlTitle', { value: pinger.htmlTitle });
new CfnOutput(stack, 'URL', { value: pinger.url });
new CfnOutput(stack, 'Body', { value: pinger.body });

app.synth();

