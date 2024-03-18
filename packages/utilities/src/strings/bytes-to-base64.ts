export function bytesToBase64(bytes: Uint8Array): string {
  let binaryString = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(bytes[i] as number);
  }
  return window.btoa(binaryString);
}
