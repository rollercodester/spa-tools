import cryptoNode from 'crypto';
import fs from 'fs';
import { jsonStringify } from '../../../utilities/src/data/json-stringify';
import { BUFFER_ENC, DomainConfig, OBFI, OBFK } from '../types';

const OBF_ALGO = 'aes-256-cbc';

export function nodejsDeobfuscateConfig<S>(obfuscatedConfig: string, outputPath?: string) {
  const encryptedText = Buffer.from(obfuscatedConfig, BUFFER_ENC);
  const decipher = cryptoNode.createDecipheriv(OBF_ALGO, Buffer.from(OBFK, BUFFER_ENC), Buffer.from(OBFI, BUFFER_ENC));

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  const encodedConfig = decrypted.toString();
  const decodedConfig = JSON.parse(encodedConfig);

  if (outputPath) {
    fs.writeFileSync(outputPath, JSON.stringify(decodedConfig, null, 2));
  }

  return decodedConfig as DomainConfig<S>;
}

export function nodejsObfuscateConfig<S>(domainConfig: DomainConfig<S>, outputPath?: string) {
  const cipher = cryptoNode.createCipheriv(OBF_ALGO, Buffer.from(OBFK, BUFFER_ENC), Buffer.from(OBFI, BUFFER_ENC));
  const encodedObfConfig = jsonStringify(domainConfig);
  let encrypted = cipher.update(encodedObfConfig);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const obfConfig = encrypted.toString(BUFFER_ENC);

  if (outputPath) {
    fs.writeFileSync(outputPath, obfConfig);
  }

  return obfConfig;
}
