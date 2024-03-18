export const INVALID_FILE_TYPE_ERR = 'Invalid file type specified';

/**
 * Downloads a file from a URL or Blob.
 */
export function downloadFile(source: string, fileName: string, type: 'url'): void;
export function downloadFile(source: string, fileName: string, type: 'text'): void;
export function downloadFile(source: Blob, fileName: string, type: 'blob'): void;
export function downloadFile(source: string | Blob, fileName: string, type: 'blob' | 'text' | 'url') {
  const anchorElement = document.createElement('a');
  anchorElement.style.display = 'none';

  switch (type) {
    case 'url':
      if (typeof source !== 'string') {
        throw new Error(INVALID_FILE_TYPE_ERR);
      }
      anchorElement.href = source as string;
      anchorElement.target = '_blank';
      break;
    case 'text':
      if (typeof source !== 'string') {
        throw new Error(INVALID_FILE_TYPE_ERR);
      }
      anchorElement.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(source as string);
      break;
    case 'blob':
      if (!(source instanceof Blob)) {
        throw new Error(INVALID_FILE_TYPE_ERR);
      }
      anchorElement.href = URL.createObjectURL(source);
      break;
    default:
      throw new Error(INVALID_FILE_TYPE_ERR);
  }

  anchorElement.download = fileName.replace(/[\\%$#/:*?"<>|\s]/g, '_');
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
}
