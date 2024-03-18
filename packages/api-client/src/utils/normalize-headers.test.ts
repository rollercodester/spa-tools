import { EndpointOptions } from '../types';
import { normalizeHeaders } from './normalize-headers';

describe('normalizeHeaders', () => {
  it('should return headers with "Content-Type" set to "application/json" by default', async () => {
    const options: EndpointOptions = { requestOptions: { url: 'https://example.com' } };
    const headers = await normalizeHeaders(options);
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('should return headers with "Content-Type" set to "application/x-www-form-urlencoded" when requestType is "form" and formEncodingType is "url"', async () => {
    const options: EndpointOptions = {
      requestOptions: {
        formEncodingType: 'url',
        requestType: 'form',
        url: 'https://example.com',
      },
    };
    const headers = await normalizeHeaders(options);
    expect(headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
  });

  it('should return headers with "Content-Type" set to "multipart/form-data" when requestType is "form" and formEncodingType is "multipart"', async () => {
    const options: EndpointOptions = {
      requestOptions: {
        formEncodingType: 'multipart',
        requestType: 'form',
        url: 'https://example.com',
      },
    };
    const headers = await normalizeHeaders(options);
    expect(headers.get('Content-Type')).toBe('multipart/form-data');
  });

  it('should return headers with "Content-Type" set to "text/plain" when requestType is "text"', async () => {
    const options: EndpointOptions = {
      requestOptions: {
        requestType: 'text',
        url: 'https://example.com',
      },
    };
    const headers = await normalizeHeaders(options);
    expect(headers.get('Content-Type')).toBe('text/plain');
  });

  it('should return headers with "Content-Type" set to the value provided in getHeaders callback function', async () => {
    const options: EndpointOptions = {
      callbackOptions: {
        onAddHeaders: () => new Promise((resolve) => resolve(new Headers({ 'Content-Type': 'application/xml' }))),
      },
      requestOptions: { url: 'https://example.com' },
    };
    const headers = await normalizeHeaders(options);
    expect(headers.get('Content-Type')).toBe('application/xml');
  });

  it('should return headers returned by getHeaders callback function', async () => {
    const options: EndpointOptions = {
      callbackOptions: {
        onAddHeaders: () => new Promise((resolve) => resolve(new Headers({ Authorization: 'Bearer token' }))),
      },
      requestOptions: { url: 'https://example.com' },
    };
    const headers = await normalizeHeaders(options);
    expect(headers.get('Authorization')).toBe('Bearer token');
  });
});
