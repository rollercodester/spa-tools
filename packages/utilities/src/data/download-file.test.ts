/* eslint-disable @typescript-eslint/no-explicit-any */
import { downloadFile } from './download-file';

const originalCreateElement = document.createElement;
const originalDocBodyAppendChild = document.body.appendChild;
const originalDocBodyRemoveChild = document.body.removeChild;
const OriginalUrl = globalThis.URL;

// Create a mock URL constructor
function MockURL(url: string | URL, base?: string | URL) {
  // You can add your own logic here
  return new OriginalUrl(url, base);
}

// MockURL should have the same prototype as the original URL
MockURL.prototype = OriginalUrl.prototype;

// Mock the static methods
MockURL.createObjectURL = () => '';

MockURL.revokeObjectURL = () => undefined;

const clickMock = vi.fn();

const linkMockImpl = {
  click: clickMock,
  download: '',
  href: '',
  innerHTML: '',
  setAttribute: vi.fn(),
  style: { display: 'visible' },
};

describe('downloadFile', () => {
  const appendChildMock = vi.fn().mockImplementation(() => {});
  const removeChildMock = vi.fn();

  const anchorElementMock = vi.fn().mockImplementation(() => {
    return linkMockImpl;
  });

  beforeAll(() => {
    document.createElement = anchorElementMock;
    document.body.appendChild = appendChildMock;
    document.body.removeChild = removeChildMock;
    globalThis.URL = MockURL as any;
  });

  afterAll(() => {
    document.createElement = originalCreateElement;
    document.body.appendChild = originalDocBodyAppendChild;
    document.body.removeChild = originalDocBodyRemoveChild;
    globalThis.URL = OriginalUrl;
  });

  it('should download a file from a URL', () => {
    const url = 'https://example.com/image.jpg';
    const fileName = 'image.jpg';
    const type = 'url';

    downloadFile(url, fileName, type);

    expect(appendChildMock).toHaveBeenCalledWith(linkMockImpl);
    expect(clickMock).toHaveBeenCalled();
    expect(removeChildMock).toHaveBeenCalledWith(linkMockImpl);
  });

  it('should download a text file', () => {
    const text = 'Hello, world!';
    const fileName = 'text.txt';
    const type = 'text';

    downloadFile(text, fileName, type);

    expect(appendChildMock).toHaveBeenCalledWith(linkMockImpl);
    expect(clickMock).toHaveBeenCalled();
    expect(removeChildMock).toHaveBeenCalledWith(linkMockImpl);
  });

  it('should download an image file', () => {
    const imageBlob = new Blob(['image data'], { type: 'image/jpeg' });
    const fileName = 'image.jpg';
    const type = 'blob';

    downloadFile(imageBlob, fileName, type);

    expect(appendChildMock).toHaveBeenCalledWith(linkMockImpl);
    expect(clickMock).toHaveBeenCalled();
    expect(removeChildMock).toHaveBeenCalledWith(linkMockImpl);
  });

  it('should throw an error for invalid file type', () => {
    const invalidSource = '123';
    const fileName = 'file.txt';
    const type = 'invalid';

    expect(() => {
      downloadFile(invalidSource, fileName, type as any);
    }).toThrowError('Invalid file type');
  });

  it('should throw an error when invalid source type provided for url', () => {
    const invalidSource = 123;
    const fileName = 'file.txt';
    const type = 'url';

    expect(() => {
      downloadFile(invalidSource as any, fileName, type as any);
    }).toThrowError('Invalid file type');
  });

  it('should throw an error when invalid source type provided for text', () => {
    const invalidSource = 123;
    const fileName = 'file.txt';
    const type = 'text';

    expect(() => {
      downloadFile(invalidSource as any, fileName, type as any);
    }).toThrowError('Invalid file type');
  });

  it('should throw an error when invalid source type provided for image', () => {
    const invalidSource = 123;
    const fileName = 'file.txt';
    const type = 'blob';

    expect(() => {
      downloadFile(invalidSource as any, fileName, type as any);
    }).toThrowError('Invalid file type');
  });
});
