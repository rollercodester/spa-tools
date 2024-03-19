import fs from 'fs';
import path from 'path';
import * as obf from '../nodejs-obfuscation/nodejs-obfuscation';
import { BaseConfigSettings } from '../types';
import { deobfuscateCommand, obfuscateCommand } from './obfuscator-cmds';
import testConfigFromFile from './test-rtc.json';

const rtcInputFile = path.resolve(__dirname, './test-rtc.json');
const obfInputFile = path.resolve(__dirname, './test-obf.txt');
const obfInputFileContents = fs.readFileSync(obfInputFile, 'utf-8');
const mockedOutputPath = '/some/bogus/path';

describe('obfuscator-cmds', () => {
  const obfuscateConfigSpy = vi.spyOn(obf, 'nodejsObfuscateConfig');
  const deobfuscateConfigSpy = vi.spyOn(obf, 'nodejsDeobfuscateConfig');

  const writeFileSyncSpy = vi.spyOn(fs, 'writeFileSync');
  writeFileSyncSpy.mockImplementation(() => null);

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
    writeFileSyncSpy.mockClear();
  });

  test('should obfuscate config and log the obfuscated result', () => {
    obfuscateCommand<TestConfigSettings>(rtcInputFile);

    expect(obfuscateConfigSpy).toHaveBeenCalledWith(testConfigFromFile, undefined);
    expect(console.log).toHaveBeenCalled();
  });

  test('should obfuscate the config and write out the obfuscated result', () => {
    obfuscateCommand<TestConfigSettings>(rtcInputFile, mockedOutputPath);

    expect(obfuscateConfigSpy).toHaveBeenCalledWith(testConfigFromFile, undefined);
    expect(writeFileSyncSpy).toHaveBeenCalledWith(mockedOutputPath, obfInputFileContents);
    expect(console.log).toHaveBeenCalled();
  });

  test('should deobfuscate the obfuscated config and log the deobfuscated result', () => {
    deobfuscateCommand<TestConfigSettings>(obfInputFile);

    expect(deobfuscateConfigSpy).toHaveBeenCalledWith(obfInputFileContents, undefined);
    expect(console.log).toHaveBeenCalled();
  });

  test('should deobfuscate the obfuscated config and write out the deobfuscated result', () => {
    deobfuscateCommand<TestConfigSettings>(obfInputFile, mockedOutputPath);

    expect(deobfuscateConfigSpy).toHaveBeenCalledWith(obfInputFileContents, undefined);
    expect(writeFileSyncSpy).toHaveBeenCalledWith(mockedOutputPath, JSON.stringify(testConfigFromFile, null, 2));
    expect(console.log).toHaveBeenCalled();
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
