const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism, DevEnvironmentDockerImage, Gitpod } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

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
  minNodeVersion: '12.20.0',
  devDeps: [
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-ecs-patterns',
    'esbuild',
    'projen-automate-it',
  ],
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud'],
  },
  deps: ['axios'],
  bundledDeps: ['axios'],
  publishToPypi: {
    distName: 'cdk-http-pinger',
    module: 'cdk_http_pinger',
  },
});


const gitpodPrebuild = project.addTask('gitpod:prebuild', {
  description: 'Prebuild setup for Gitpod',
});
// install and compile only, do not test or package.
gitpodPrebuild.exec('yarn install');
gitpodPrebuild.exec('npx projen compile');

let gitpod = new Gitpod(project, {
  dockerImage: DevEnvironmentDockerImage.fromImage('public.ecr.aws/pahudnet/gitpod-workspace:latest'),
  prebuilds: {
    addCheck: true,
    addBadge: true,
    addLabel: true,
    branches: true,
    pullRequests: true,
    pullRequestsFromForks: true,
  },
});

gitpod.addCustomTask({
  init: 'yarn gitpod:prebuild',
  // always upgrade after init
  command: 'npx projen upgrade',
});

gitpod.addVscodeExtensions(
  'dbaeumer.vscode-eslint',
  'ms-azuretools.vscode-docker',
  'AmazonWebServices.aws-toolkit-vscode',
);


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
