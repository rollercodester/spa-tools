import CodeBlock from '@theme/CodeBlock';

export function RuntimeConfigGettingStartedJsCode() {
  return (
    <CodeBlock language='js'>
      {`import { RuntimeConfig } from '@spa-tools/runtime-config';

//
// here we define our environment domain-config by mapping our app domain names
// to our respective environment settings
//
// take note that the "environment" property in the domain-config is required, but
// all other properteis are 100% up to you and your app's needs
//
const myAppConfigSet = {
  //
  // development environment settings (based on domain name)
  //
  'myapp.dev.com': {
    authClientId: 'auth-client-id-dev',
    authUserPoolId: 'user-pool-id-dev',
    environment: 'development',
    loggerClientId: 'logger-client-id-dev',
    loggerUrl: 'https://dev.loggingservice.com',
    myAppApiUrl: 'https://api.dev.myapp.com',
  },
  //
  // staging environment settings (based on domain name)
  //
  'myapp.stg.com': {
    authClientId: 'auth-client-id-stg',
    authUserPoolId: 'user-pool-id-stg',
    environment: 'staging',
    loggerClientId: 'logger-client-id-stg',
    loggerUrl: 'https://stg.loggingservice.com',
    myAppApiUrl: 'https://api.stg.myapp.com',
  },
  //
  // production environment settings (based on domain name)
  //
  'myapp.com': {
    authClientId: 'auth-client-id-prod',
    authUserPoolId: 'user-pool-id-prod',
    environment: 'production',
    loggerClientId: 'logger-client-id-prod',
    loggerUrl: 'https://loggingservice.com',
    myAppApiUrl: 'https://api.myapp.com',
  },
  //
  // finally we define settings for when our app is running locally
  //
  // notice that we still consider local our "development" backend
  // environment but we could map it to any environment we wanted
  //
  localhost: {
    authClientId: 'auth-client-id-dev',
    authUserPoolId: 'user-pool-id-dev',
    environment: 'development',
    loggerClientId: 'logger-client-id-dev',
    loggerUrl: 'https://dev.loggingservice.com',
    myAppApiUrl: 'https://api.dev.myapp.com',
  },
};

// here we initialize the runtime config object
export const myAppRuntimeConfig = RuntimeConfig.initialize(myAppConfigSet);

//
// now we can access our runtime config object in our app, which will automatically
// return the settings for the environment our app is running in
//

console.log('What is the current environment context?');
console.log(myAppRuntimeConfig.settings.environment);

console.log("What is MyApp's current API URL?");
console.log(myAppRuntimeConfig.settings.myAppApiUrl);

console.log("Let's use the isRunningLocal property to check if we are running locally...");
if (myAppRuntimeConfig.isRunningLocal) {
  console.log('We are indeed running locally!');
} else {
  console.log('We are NOT running locally!');
}

console.log("Let's just log the entire runtime config object for good measure...");
console.log(myAppRuntimeConfig);`}
    </CodeBlock>
  );
}
