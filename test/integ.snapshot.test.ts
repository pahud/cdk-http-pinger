import '@aws-cdk/assert/jest';
import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { Pinger } from '../src/pinger';

test('integ snapshot validation', () => {
  const app = new cdk.App();

  const stack = new cdk.Stack(app, 'my-stack-dev');

  const pinger = new Pinger(stack, 'Pinger', {
    url: 'https://aws.amazon.com',
  });

  new cdk.CfnOutput(stack, 'HttpStatus', { value: pinger.httpStatus });
  new cdk.CfnOutput(stack, 'HtmlTitle', { value: pinger.htmlTitle });
  new cdk.CfnOutput(stack, 'URL', { value: pinger.url });
  new cdk.CfnOutput(stack, 'Body', { value: pinger.body });

  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();

  app.synth();

});
