import { base64ToBytes } from '../../../utilities/src';
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
