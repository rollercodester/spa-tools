import { handleResponse } from './handle-response';
import { normalizeOptions } from '.';

const frequencyStrategyKey = 'test-key';
const url = 'https://example.com';

describe('frequency-strategy', () => {
  describe('handleResponse', () => {
    it('should return error when response is not ok', async () => {
      const response = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response;

      const normOptions = normalizeOptions({
        callbackOptions: {
          onResponseError: vi.fn(),
        },
        requestOptions: {
          errorOn404: true,
          method: 'GET',
          url,
        },
      });

      const result = await handleResponse(response, frequencyStrategyKey, normOptions);

      expect(result).toEqual({
        error: 'Internal Server Error',
      });

      expect(normOptions.callbackOptions?.onResponseError).toHaveBeenCalledWith(response);
    });

    it('should return correct error when response status is 500 but no response text is returned', async () => {
      const response = {
        ok: false,
        status: 500,
      } as Response;

      const normOptions = normalizeOptions({
        callbackOptions: {
          onResponseError: vi.fn(),
        },
        requestOptions: {
          errorOn404: true,
          method: 'GET',
          url,
        },
      });

      const result = await handleResponse(response, frequencyStrategyKey, normOptions);

      expect(result).toEqual({
        error: 'Unknown Server Error',
      });

      expect(normOptions.callbackOptions?.onResponseError).toHaveBeenCalledWith(response);
    });

    it('should return correct error when response status is 404 but no response text is returned', async () => {
      const response = {
        ok: false,
        status: 404,
      } as Response;

      const normOptions = normalizeOptions({
        callbackOptions: {
          onResponseError: vi.fn(),
        },
        requestOptions: {
          errorOn404: true,
          method: 'GET',
          url,
        },
      });

      const result = await handleResponse(response, frequencyStrategyKey, normOptions);

      expect(result).toEqual({
        error: 'Not Found',
      });

      expect(normOptions.callbackOptions?.onResponseError).toHaveBeenCalledWith(response);
    });

    it('should return error when response status is 404 and errorOn404 is set to true', async () => {
      const response = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response;

      const normOptions = normalizeOptions({
        callbackOptions: {
          onResponseError: vi.fn(),
        },
        requestOptions: {
          errorOn404: true,
          method: 'GET',
          url,
        },
      });

      const result = await handleResponse(response, frequencyStrategyKey, normOptions);

      expect(result).toEqual({
        error: 'Not Found',
      });

      expect(normOptions.callbackOptions?.onResponseError).toHaveBeenCalledWith(response);
    });

    it('should return data when response type is arrayBuffer', async () => {
      const response = {
        arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)),
        ok: true,
      } as unknown as Response;

      const normOptions = normalizeOptions({
        requestOptions: {
          method: 'GET',
          responseType: 'arrayBuffer',
          url,
        },
      });

      const result = await handleResponse(response, frequencyStrategyKey, normOptions);

      expect(result).toEqual({
        data: new ArrayBuffer(8),
      });

      expect(response.arrayBuffer).toHaveBeenCalled();
    });

    it('should return data when response type is blob', async () => {
      const response = {
        blob: vi.fn().mockResolvedValue(new Blob()),
        ok: true,
      } as unknown as Response;

      const normOptions = normalizeOptions({
        requestOptions: {
          method: 'GET',
          responseType: 'blob',
          url,
        },
      });

      const result = await handleResponse(response, frequencyStrategyKey, normOptions);

      expect(result).toEqual({
        data: new Blob(),
      });

      expect(response.blob).toHaveBeenCalled();
    });

    it('should return data when response type is formData', async () => {
      const response = {
        formData: vi.fn().mockResolvedValue(new FormData()),
        ok: true,
      } as unknown as Response;

      const normOptions = normalizeOptions({
        requestOptions: {
          method: 'GET',
          responseType: 'formData',
          url,
        },
      });

      const result = await handleResponse(response, frequencyStrategyKey, normOptions);

      expect(result).toEqual({
        data: new FormData(),
      });

      expect(response.formData).toHaveBeenCalled();
    });

    it('should return data when response type is json', async () => {
      const response = {
        ok: true,
        text: vi.fn().mockResolvedValue('{"data":"json data"}'),
      } as unknown as Response;

      const normOptions = normalizeOptions({
        requestOptions: {
          method: 'GET',
          responseType: 'json',
          url,
        },
        serverModelOptions: {
          jsonDataDotPath: 'data',
          jsonErrorDotPath: 'error',
          jsonNextPageTokenDotPath: 'nextPageToken',
          jsonPreviousPageTokenDotPath: 'previousPageToken',
          jsonTotalDotPath: 'total',
        },
      });

      const result = await handleResponse(response, frequencyStrategyKey, normOptions);

      expect(result).toEqual({
        data: 'json data',
      });
    });

    it('should return data when response type is text', async () => {
      const response = {
        ok: true,
        text: vi.fn().mockResolvedValue('text data'),
      } as unknown as Response;

      const normOptions = normalizeOptions({
        requestOptions: {
          method: 'GET',
          responseType: 'text',
          url,
        },
      });

      const result = await handleResponse(response, frequencyStrategyKey, normOptions);

      expect(result).toEqual({
        data: 'text data',
      });

      expect(response.text).toHaveBeenCalled();
    });
  });
});
