import { BaseConfigSettings, DomainConfig, RuntimeConfig } from '@spa-tools/runtime-config';

export type MyAppEnvironments = 'development' | 'staging' | 'production';

export interface MyAppConfigSettings extends BaseConfigSettings<MyAppEnvironments> {
  authClientId: string;
  authUserPoolId: string;
  loggerClientId: string;
  loggerUrl: string;
  myAppApiUrl: string;
}

export const myAppConfigSet: DomainConfig<MyAppConfigSettings> = {
  localhost: {
    authClientId: 'auth-client-id-dev',
    authUserPoolId: 'user-pool-id-dev',
    environment: 'development',
    loggerClientId: 'logger-client-id-dev',
    loggerUrl: 'https://dev.loggingservice.com',
    myAppApiUrl: 'https://api.dev.myapp.com',
  },
  'myapp.com': {
    authClientId: 'auth-client-id-prod',
    authUserPoolId: 'user-pool-id-prod',
    environment: 'production',
    loggerClientId: 'logger-client-id-prod',
    loggerUrl: 'https://loggingservice.com',
    myAppApiUrl: 'https://api.myapp.com',
  },
  'myapp.dev.com': {
    authClientId: 'auth-client-id-dev',
    authUserPoolId: 'user-pool-id-dev',
    environment: 'development',
    loggerClientId: 'logger-client-id-dev',
    loggerUrl: 'https://dev.loggingservice.com',
    myAppApiUrl: 'https://api.dev.myapp.com',
  },
  'myapp.stg.com': {
    authClientId: 'auth-client-id-stg',
    authUserPoolId: 'user-pool-id-stg',
    environment: 'staging',
    loggerClientId: 'logger-client-id-stg',
    loggerUrl: 'https://stg.loggingservice.com',
    myAppApiUrl: 'https://api.stg.myapp.com',
  },
};

export const myAppRuntimeConfig = RuntimeConfig.initialize<MyAppConfigSettings, MyAppEnvironments>(myAppConfigSet);
