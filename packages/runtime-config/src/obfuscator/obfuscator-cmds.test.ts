import fs from 'fs';
import * as obf from '../nodejs-obfuscation';
import { BaseConfigSettings, DomainConfig } from '../types';
import { deobfuscateCommand, obfuscateCommand } from './obfuscator-cmds';

const testConfig: DomainConfig<TestConfigSettings> = {
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

const testObf = 'obfuscatedObfConfig';

describe('obfuscateCommand', () => {
  const consoleLogSpy = vi.spyOn(console, 'log');
  const consoleInfoSpy = vi.spyOn(console, 'info');
  const consoleErrorSpy = vi.spyOn(console, 'error');

  consoleLogSpy.mockImplementation(() => null);
  consoleInfoSpy.mockImplementation(() => null);
  consoleErrorSpy.mockImplementation(() => null);

  afterAll(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    consoleLogSpy.mockClear();
    consoleInfoSpy.mockClear();
    consoleErrorSpy.mockClear();
  });

  test('should obfuscate the config and log the obfuscated result', () => {
    const input = '/path/to/config.json';
    const configFileContents = JSON.stringify(testConfig);

    const readFileSyncSpy = vi.spyOn(fs, 'readFileSync');
    readFileSyncSpy.mockReturnValueOnce(configFileContents);

    const obfuscateConfigSpy = vi.spyOn(obf, 'nodejsObfuscateConfig');
    obfuscateConfigSpy.mockReturnValueOnce(testObf);

    obfuscateCommand<TestConfigSettings>(input);

    expect(fs.readFileSync).toHaveBeenCalledWith(input, 'utf-8');
    expect(obfuscateConfigSpy).toHaveBeenCalledWith(testConfig);
    expect(console.log).toHaveBeenCalled();
  });
});

describe('deobfuscateCommand', () => {
  test('should deobfuscate the obfuscated config and log the deobfuscated result', () => {
    const input = '/path/to/obfuscated-config.json';

    const readFileSyncSpy = vi.spyOn(fs, 'readFileSync');
    readFileSyncSpy.mockReturnValueOnce(testObf);

    const deobfuscateConfigSpy = vi.spyOn(obf, 'nodejsDeobfuscateConfig');
    deobfuscateConfigSpy.mockReturnValueOnce(testConfig);

    deobfuscateCommand<TestConfigSettings>(input);

    expect(fs.readFileSync).toHaveBeenCalledWith(input, 'utf-8');
    expect(deobfuscateConfigSpy).toHaveBeenCalledWith(testObf);
    expect(console.log).toHaveBeenCalled();
  });

  test('should obfuscate the config and write out the obfuscated result', () => {
    const input = '/path/to/obfuscated-config.json';
    const output = '/path/to/config.json';
    const cfgFileContents = JSON.stringify(testConfig, null, 2);

    const readFileSyncSpy = vi.spyOn(fs, 'readFileSync');
    readFileSyncSpy.mockReturnValueOnce(cfgFileContents);

    const writeFileSyncSpy = vi.spyOn(fs, 'writeFileSync');
    writeFileSyncSpy.mockImplementation(() => null);

    const obfuscateConfigSpy = vi.spyOn(obf, 'nodejsObfuscateConfig');
    obfuscateConfigSpy.mockReturnValueOnce(testObf);

    obfuscateCommand<TestConfigSettings>(input, output);

    expect(fs.readFileSync).toHaveBeenCalledWith(input, 'utf-8');
    expect(obfuscateConfigSpy).toHaveBeenCalledWith(testConfig);
    expect(console.log).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalledWith(output, testObf);
  });

  test('should deobfuscate the obfuscated config and write out the deobfuscated result', () => {
    const input = '/path/to/obfuscated-config.json';
    const output = '/path/to/config.json';
    const cfgFileContents = JSON.stringify(testConfig, null, 2);

    const readFileSyncSpy = vi.spyOn(fs, 'readFileSync');
    readFileSyncSpy.mockReturnValueOnce(testObf);

    const writeFileSyncSpy = vi.spyOn(fs, 'writeFileSync');
    writeFileSyncSpy.mockImplementation(() => null);

    const deobfuscateConfigSpy = vi.spyOn(obf, 'nodejsDeobfuscateConfig');
    deobfuscateConfigSpy.mockReturnValueOnce(testConfig);

    deobfuscateCommand<TestConfigSettings>(input, output);

    expect(fs.readFileSync).toHaveBeenCalledWith(input, 'utf-8');
    expect(deobfuscateConfigSpy).toHaveBeenCalledWith(testObf);
    expect(console.log).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalledWith(output, cfgFileContents);
  });
});

//
//
// local types
//
//

interface TestConfigSettings extends BaseConfigSettings {
  appApiBaseUrl: string;
  authClientId: string;
  authUserPoolId: string;
}
