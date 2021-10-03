import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import { Construct, CustomResource } from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

export interface PingerProps {
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
    const onEvent = new lambda.Function(this, 'ProviderFunc', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      handler: 'index.handler',
      runtime: lambda.Runtime.PYTHON_3_9,
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
