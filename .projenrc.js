const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  author: 'Pahud Hsieh',
  authorAddress: 'pahudnet@gmail.com',
  cdkVersion: '1.73.0',
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  name: 'cdk-http-pinger',
  description: 'HTTP Pinger for AWS CDK',
  repositoryUrl: 'https://github.com/pahud/cdk-http-pinger.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/custom-resources',
  ],
  devDeps: [
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-ecs-patterns',
    'esbuild',
  ],
  deps: ['axios'],
  bundledDeps: [
    'axios',
    'esbuild',
  ],
  publishToPypi: {
    distName: 'cdk-http-pinger',
    module: 'cdk_http_pinger',
  },
});

const common_exclude = [
  'cdk.out',
  'cdk.context.json',
  'images',
  'yarn-error.log',
  'dependabot.yml',
];

project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
