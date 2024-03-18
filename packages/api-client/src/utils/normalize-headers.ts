import { EndpointOptions } from '../types';

export async function normalizeHeaders(options: EndpointOptions) {
  const headers = options.callbackOptions?.onAddHeaders ? await options.callbackOptions.onAddHeaders() : new Headers();
  const requestType = options.requestOptions?.requestType || 'json';
  const formEncodingType = options.requestOptions?.formEncodingType || 'url';

  if (!headers.has('Content-Type')) {
    switch (requestType) {
      case 'json':
        headers.set('Content-Type', 'application/json');
        break;
      case 'form':
        headers.set(
          'Content-Type',
          formEncodingType === 'url' ? 'application/x-www-form-urlencoded' : 'multipart/form-data'
        );
        break;
      case 'text':
        headers.set('Content-Type', 'text/plain');
        break;
    }
  }

  return headers;
}
