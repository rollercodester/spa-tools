import { BaseConfigSettings, DomainConfig } from '../types';
import { nodejsDeobfuscateConfig, nodejsObfuscateConfig } from './nodejs-obfuscation';

const testConfig1: DomainConfig<TestConfigSettings1> = {
  localhost: {
    appApiBaseUrl: 'https://api.development.example.com',
    authClientId: 'dev-client-id',
    authUserPoolId: 'dev-user-pool-id',
    environment: 'development',
  },
  'myapp.com': {
    appApiBaseUrl: 'https://api.example.com',
    authClientId: 'prod-client-id',
    authUserPoolId: 'prod-user-pool-id',
    environment: 'production',
  },
  'myapp.development.com': {
    appApiBaseUrl: 'https://api.development.example.com',
    authClientId: 'dev-client-id',
    authUserPoolId: 'dev-user-pool-id',
    environment: 'development',
  },
  'myapp.test.com': {
    appApiBaseUrl: 'https://api.test.example.com',
    authClientId: 'test-client-id',
    authUserPoolId: 'test-user-pool-id',
    environment: 'test',
  },
};

const testConfig2: DomainConfig<TestConfigSettings2> = {
  'myapp.com': {
    environment: 'prod',
    saasDbApiKey: 'prod-db-api-key',
    saasDbUrl: 'https://prod-db.example.com',
    saasLoggingApiKey: 'prod-logging-api-key',
    saasLoggingUrl: 'https://prod-logging.example.com',
  },
  'myapp.dev.com': {
    environment: 'dev',
    saasDbApiKey: 'dev-db-api-key',
    saasDbUrl: 'https://dev-db.example.com',
    saasLoggingApiKey: 'dev-logging-api-key',
    saasLoggingUrl: 'https://dev-logging.example.com',
  },
  'myapp.stg.com': {
    environment: 'stg',
    saasDbApiKey: 'stg-db-api-key',
    saasDbUrl: 'https://stg-db.example.com',
    saasLoggingApiKey: 'stg-logging-api-key',
    saasLoggingUrl: 'https://stg-logging.example.com',
  },
};

describe('NodeJS Obfuscator', () => {
  test('should correctly obfuscate config', () => {
    const obfuscatedConfig1 = nodejsObfuscateConfig(testConfig1);
    const deobfuscateCfg1 = nodejsDeobfuscateConfig(obfuscatedConfig1);
    const obfuscatedConfig2 = nodejsObfuscateConfig(testConfig2);
    const deobfuscateCfg2 = nodejsDeobfuscateConfig(obfuscatedConfig2);

    expect(deobfuscateCfg1).toEqual(testConfig1);
    expect(deobfuscateCfg2).toEqual(testConfig2);
    expect(deobfuscateCfg1).not.toEqual(deobfuscateCfg2);
    expect(obfuscatedConfig1).not.toEqual(obfuscatedConfig2);
  });
});

//
//
// local types
//
//

type TestEnvionment2 = 'dev' | 'stg' | 'prod';

interface TestConfigSettings1 extends BaseConfigSettings {
  appApiBaseUrl: string;
  authClientId: string;
  authUserPoolId: string;
}

interface TestConfigSettings2 extends BaseConfigSettings<TestEnvionment2> {
  saasDbApiKey: string;
  saasDbUrl: string;
  saasLoggingApiKey: string;
  saasLoggingUrl: string;
}
