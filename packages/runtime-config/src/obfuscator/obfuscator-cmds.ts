import fs from 'fs';
import { jsonStringify } from '../../../utilities/src/data/json-stringify';
import { nodejsDeobfuscateConfig, nodejsObfuscateConfig } from '../nodejs-obfuscation';
import { DomainConfig } from '../types';

export function deobfuscateCommand<S>(inputPath: string, outputPath?: string) {
  const fileContents = fs.readFileSync(inputPath, 'utf-8');
  const config = nodejsDeobfuscateConfig<S>(fileContents, outputPath);
  const encodedConfig = jsonStringify(config, 2);

  if (outputPath) {
    console.log(`Deobfuscated config saved to ${outputPath}`);
  } else {
    console.log('Deobfuscated config:');
    console.log(encodedConfig + '\n');
  }

  return encodedConfig;
}

export function obfuscateCommand<S>(inputPath: string, outputPath?: string) {
  const fileContents = fs.readFileSync(inputPath, 'utf-8');
  const config = JSON.parse(fileContents) as DomainConfig<S>;
  const obfConfig = nodejsObfuscateConfig(config, outputPath);

  if (outputPath) {
    console.log(`Obfuscated config saved to ${outputPath}`);
  } else {
    console.log('Obfuscated config:');
    console.log(obfConfig + '\n');
  }

  return obfConfig;
}
