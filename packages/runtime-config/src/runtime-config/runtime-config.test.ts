import fs from 'fs';
import path from 'path';
import { mockWindowLocation, restoreWindowLocation } from '../../../../mocks';
import { nodejsObfuscateConfig } from '../nodejs-obfuscation';
import { BaseConfigSettings, DomainConfig } from '../types';
import { NON_OBF_STRING_ERROR, OBF_STRING_ERROR, RuntimeConfig, getNoRuntimeConfigError } from './runtime-config';

const obfInputFile = path.resolve(__dirname, '../obfuscator/test-obf.txt');
const obfInputFileContents = fs.readFileSync(obfInputFile, 'utf-8');

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

const testConfig3: DomainConfig<TestConfigSettings2> = {
  'myapp.com': {
    environment: 'prod',
    saasDbApiKey: 'prod-db-api-key',
    saasDbUrl: 'https://prod-db.example.com',
    saasLoggingApiKey: 'prod-logging-api-key',
    saasLoggingUrl: 'https://prod-logging.example.com',
  },
  'myapp.com/dev': {
    environment: 'dev',
    saasDbApiKey: 'dev-db-api-key',
    saasDbUrl: 'https://dev-db.example.com',
    saasLoggingApiKey: 'dev-logging-api-key',
    saasLoggingUrl: 'https://dev-logging.example.com',
  },
  'myapp.com/stg': {
    environment: 'stg',
    saasDbApiKey: 'stg-db-api-key',
    saasDbUrl: 'https://stg-db.example.com',
    saasLoggingApiKey: 'stg-logging-api-key',
    saasLoggingUrl: 'https://stg-logging.example.com',
  },
};

describe('RuntimeConfig', () => {
  afterAll(() => {
    restoreWindowLocation();
  });

  it('should return the correct config for valid hostnames', () => {
    const runtimeConfig1 = RuntimeConfig.initialize(testConfig1);

    mockWindowLocation('https://localhost');
    expect(runtimeConfig1.settings).toEqual(testConfig1['localhost']);

    mockWindowLocation('https://myapp.development.com');
    expect(runtimeConfig1.settings).toEqual(testConfig1['myapp.development.com']);

    mockWindowLocation('https://myapp.test.com');
    expect(runtimeConfig1.settings).toEqual(testConfig1['myapp.test.com']);

    mockWindowLocation('https://myapp.com');
    expect(runtimeConfig1.settings).toEqual(testConfig1['myapp.com']);

    const runtimeConfig2 = RuntimeConfig.initialize<TestConfigSettings2, TestEnvionment2>(testConfig2);

    mockWindowLocation('https://myapp.dev.com');
    expect(runtimeConfig2.settings).toEqual(testConfig2['myapp.dev.com']);

    mockWindowLocation('https://myapp.stg.com');
    expect(runtimeConfig2.settings).toEqual(testConfig2['myapp.stg.com']);

    mockWindowLocation('https://myapp.com');
    expect(runtimeConfig2.settings).toEqual(testConfig2['myapp.com']);
  });

  it('should set isRunningLocal to true if running local', () => {
    const runtimeConfig = RuntimeConfig.initialize(testConfig1);

    mockWindowLocation('https://localhost');
    expect(runtimeConfig.isRunningLocal).toBe(true);

    mockWindowLocation('https://127.0.0.1');
    expect(runtimeConfig.isRunningLocal).toBe(true);
  });

  it('should set isRunningLocal to false if NOT running local', () => {
    const runtimeConfig = RuntimeConfig.initialize(testConfig1);

    mockWindowLocation('https://myapp.dev.com');
    expect(runtimeConfig.isRunningLocal).toBe(false);
  });

  it('should throw an error if location hostname not recognized', () => {
    const runtimeConfig = RuntimeConfig.initialize(testConfig1);

    mockWindowLocation('https://not-recognized.com');
    expect(() => runtimeConfig.settings).toThrowError(getNoRuntimeConfigError('not-recognized.com'));
  });

  it('should allow localhost IP address to be configured', () => {
    const runtimeConfig = RuntimeConfig.initialize(testConfig1, { localhostIpAddress: '0.0.0.0' });

    mockWindowLocation('https://127.0.0.1');
    expect(() => runtimeConfig.settings).toThrowError(getNoRuntimeConfigError('127.0.0.1'));

    mockWindowLocation('https://0.0.0.0');
    expect(runtimeConfig.isRunningLocal).toBe(true);
  });

  it('should use manualActiveHostname when running outside of a browser environment', () => {
    // restore window location with flag so location is set to null
    restoreWindowLocation(true);

    const runtimeConfig = RuntimeConfig.initialize(testConfig1, { manualActiveHostname: 'myapp.com' });

    expect(runtimeConfig.settings).toEqual(testConfig1['myapp.com']);
  });

  it('should deobfuscate an obfuscated config', async () => {
    const obfuscatedConfig = nodejsObfuscateConfig(testConfig1);
    const runtimeConfig = await RuntimeConfig.initializeObf(obfuscatedConfig);

    mockWindowLocation('https://localhost');
    expect(runtimeConfig.settings).toEqual(testConfig1['localhost']);

    mockWindowLocation('https://myapp.development.com');
    expect(runtimeConfig.settings).toEqual(testConfig1['myapp.development.com']);

    mockWindowLocation('https://myapp.test.com');
    expect(runtimeConfig.settings).toEqual(testConfig1['myapp.test.com']);

    mockWindowLocation('https://myapp.com');
    expect(runtimeConfig.settings).toEqual(testConfig1['myapp.com']);

    const runtimeConfig2 = RuntimeConfig.initialize<TestConfigSettings2, TestEnvionment2>(testConfig2);

    mockWindowLocation('https://myapp.dev.com');
    expect(runtimeConfig2.settings).toEqual(testConfig2['myapp.dev.com']);

    mockWindowLocation('https://myapp.stg.com');
    expect(runtimeConfig2.settings).toEqual(testConfig2['myapp.stg.com']);

    mockWindowLocation('https://myapp.com');
    expect(runtimeConfig2.settings).toEqual(testConfig2['myapp.com']);
  });

  it('should load an encoded config', async () => {
    const encodedConfig = JSON.stringify(testConfig1);
    const runtimeConfig = RuntimeConfig.initialize(encodedConfig);

    await new Promise((resolve) => setTimeout(resolve, 300));

    mockWindowLocation('https://localhost');
    expect(runtimeConfig.settings).toEqual(testConfig1['localhost']);

    mockWindowLocation('https://myapp.development.com');
    expect(runtimeConfig.settings).toEqual(testConfig1['myapp.development.com']);

    mockWindowLocation('https://myapp.test.com');
    expect(runtimeConfig.settings).toEqual(testConfig1['myapp.test.com']);

    mockWindowLocation('https://myapp.com');
    expect(runtimeConfig.settings).toEqual(testConfig1['myapp.com']);

    const runtimeConfig2 = RuntimeConfig.initialize<TestConfigSettings2, TestEnvionment2>(testConfig2);

    mockWindowLocation('https://myapp.dev.com');
    expect(runtimeConfig2.settings).toEqual(testConfig2['myapp.dev.com']);

    mockWindowLocation('https://myapp.stg.com');
    expect(runtimeConfig2.settings).toEqual(testConfig2['myapp.stg.com']);

    mockWindowLocation('https://myapp.com');
    expect(runtimeConfig2.settings).toEqual(testConfig2['myapp.com']);
  });

  it('should throw an error if an obfuscated string passed into initialize', () => {
    expect(() => RuntimeConfig.initialize(obfInputFileContents)).toThrowError(OBF_STRING_ERROR);
  });

  it('should throw an error if a non-obfuscated string passed into initializeObf', () => {
    expect(() => RuntimeConfig.initializeObf('blah blah blah')).rejects.toThrowError(NON_OBF_STRING_ERROR);
  });

  it('should match the domain config when startsWithMatching is true', () => {
    const runtimeConfig3 = RuntimeConfig.initialize<TestConfigSettings2, TestEnvionment2>(testConfig3, {
      startsWithMatching: true,
    });

    mockWindowLocation('https://myapp.com/dev');
    expect(runtimeConfig3.settings).toEqual(testConfig3['myapp.com/dev']);

    mockWindowLocation('https://myapp.com/stg');
    expect(runtimeConfig3.settings).toEqual(testConfig3['myapp.com/stg']);

    mockWindowLocation('https://myapp.com');
    expect(runtimeConfig3.settings).toEqual(testConfig3['myapp.com']);
  });

  it('should throw an error when startsWithMatching is true but no match is found', () => {
    const runtimeConfig3 = RuntimeConfig.initialize<TestConfigSettings2, TestEnvionment2>(testConfig3, {
      startsWithMatching: true,
    });

    mockWindowLocation('https://myotherapp.com/not-recognized');
    expect(() => runtimeConfig3.settings).toThrowError(getNoRuntimeConfigError('myotherapp.com/not-recognized'));
  });

  it('should set isRunningLocal to true if running local matches when startsWithMatching is set', () => {
    const runtimeConfig = RuntimeConfig.initialize<TestConfigSettings2, TestEnvionment2>(testConfig3, {
      startsWithMatching: true,
    });

    mockWindowLocation('https://localhost/123');
    expect(runtimeConfig.isRunningLocal).toBe(true);

    mockWindowLocation('https://127.0.0.1');
    expect(runtimeConfig.isRunningLocal).toBe(true);
  });

  it('should set isRunningLocal to false if running local NOT matched and startsWithMatching is set', () => {
    const runtimeConfig = RuntimeConfig.initialize<TestConfigSettings2, TestEnvionment2>(testConfig3, {
      startsWithMatching: true,
    });

    mockWindowLocation('https://myapp.com');
    expect(runtimeConfig.isRunningLocal).toBe(false);
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
