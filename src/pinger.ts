import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as logs from '@aws-cdk/aws-logs';
import { Construct, CustomResource } from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

export interface PingerProps {
  readonly parameter?: { [key: string]: string };
  readonly url: string;
  /**
   * optional entry file
   */
  readonly entry?: string;
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
      entry: props.entry ?? path.join(__dirname, './lambda/index.js'),
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
