import { base64ToBytes, bytesToBase64, jsonStringify } from '../../../utilities/src';
import { DomainConfig, OBFI, OBFK } from '../types';

const OBF_ALGO = 'AES-CBC';

export async function browserDeobfuscateConfig<S>(obfuscatedConfig: string) {
  const keyBuffer = base64ToBytes(OBFK);
  const config = base64ToBytes(obfuscatedConfig);
  const iv = base64ToBytes(OBFI);
  const importedKey = await window.crypto.subtle.importKey('raw', keyBuffer, { name: OBF_ALGO }, true, [
    'encrypt',
    'decrypt',
  ]);
  const decryptedConfig = await window.crypto.subtle.decrypt({ iv, name: OBF_ALGO }, importedKey, config);
  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(decryptedConfig)) as DomainConfig<S>;
}

export async function browserObfuscateConfig<S>(domainConfig: DomainConfig<S> | string) {
  const encodedObfConfig = typeof domainConfig === 'string' ? domainConfig : jsonStringify(domainConfig);
  const encodedObfConfigBuffer = new TextEncoder().encode(encodedObfConfig);
  const keyBuffer = base64ToBytes(OBFK);
  const importedKey = await window.crypto.subtle.importKey('raw', keyBuffer, { name: OBF_ALGO }, true, [
    'encrypt',
    'decrypt',
  ]);
  const iv = base64ToBytes(OBFI);
  const encrypted = await window.crypto.subtle.encrypt({ iv, name: OBF_ALGO }, importedKey, encodedObfConfigBuffer);
  const obfConfig = bytesToBase64(new Uint8Array(encrypted));
  return obfConfig;
}
