/* eslint-disable no-case-declarations */
import { jsonStringify } from '../../../utilities/src/data/json-stringify';
import { EndpointOptions, EndpointResult, NormEndpointOptionsDefaults } from '../types';
import { memDataCache } from './common';
import { handleJsonResponse } from './handle-json-response';

export async function handleResponse<ResultDataType = unknown, ResultErrorType = unknown>(
  response: Response,
  frequencyStrategyKey: string,
  normOptions: EndpointOptions & NormEndpointOptionsDefaults
) {
  if (!response.ok && (response.status !== 404 || normOptions.requestOptions.errorOn404)) {
    if (normOptions.callbackOptions?.onResponseError) {
      normOptions.callbackOptions.onResponseError(response);
    }

    if (normOptions.requestOptions.responseType !== 'json' || !normOptions.serverModelOptions.jsonErrorDotPath) {
      //
      // EARLY RETURN because of response error
      //
      return {
        error: response.statusText || (response.status === 404 ? 'Not Found' : 'Unknown Server Error'),
      } as EndpointResult<ResultDataType, ResultErrorType>;
    }
  }

  let endpointResult: EndpointResult<unknown, ResultErrorType> | null = null;

  switch (normOptions.requestOptions.responseType) {
    case 'arrayBuffer':
      try {
        const bufferData = await response.arrayBuffer();
        endpointResult = {
          data: bufferData,
        } as EndpointResult<ArrayBuffer, ResultErrorType>;
        /* v8 ignore start */
      } catch (error) {
        endpointResult = {
          error: `Array buffer could not be parsed from the response: ${error}`,
        } as EndpointResult<ResultDataType, ResultErrorType>;
        /* v8 ignore end */
      }
      break;
    case 'blob':
      try {
        const blobData = await response.blob();
        endpointResult = {
          data: blobData,
        } as EndpointResult<Blob, ResultErrorType>;
        /* v8 ignore start */
      } catch (error) {
        endpointResult = {
          error: `Blob could not be parsed from the response: ${error}`,
        } as EndpointResult<ResultDataType, ResultErrorType>;
        /* v8 ignore end */
      }
      break;
    case 'formData':
      try {
        const formData = await response.formData();
        endpointResult = {
          data: formData,
        } as EndpointResult<FormData, ResultErrorType>;
        /* v8 ignore start */
      } catch (error) {
        endpointResult = {
          error: `Form data could not be parsed from the response: ${error}`,
        } as EndpointResult<ResultDataType, ResultErrorType>;
        /* v8 ignore end */
      }
      break;
    case 'json':
      endpointResult = (await handleJsonResponse({
        jsonDataDotPath: normOptions.serverModelOptions.jsonDataDotPath,
        jsonErrorDotPath: normOptions.serverModelOptions.jsonErrorDotPath,
        jsonNextPageTokenDotPath: normOptions.serverModelOptions.jsonNextPageTokenDotPath,
        jsonPreviousPageTokenDotPath: normOptions.serverModelOptions.jsonPreviousPageTokenDotPath,
        jsonTotalDotPath: normOptions.serverModelOptions.jsonTotalDotPath,
        response,
      })) as EndpointResult<ResultDataType, ResultErrorType>;
      break;
    case 'text':
      try {
        const textData = await response.text();
        endpointResult = {
          data: textData,
        } as EndpointResult<string, ResultErrorType>;
        break;
        /* v8 ignore start */
      } catch (error) {
        endpointResult = {
          error: `Text data could not be parsed from the response: ${error}`,
        } as EndpointResult<ResultDataType, ResultErrorType>;
        break;
        /* v8 ignore end */
      }
  }

  if (
    normOptions.requestOptions.method === 'GET' &&
    (normOptions.frequencyOptions.frequencyStrategy === 'memory-cache' ||
      normOptions.frequencyOptions.frequencyStrategy === 'session-cache')
  ) {
    //
    //
    // cache the result
    //
    //
    const expiresAt = Date.now() + normOptions.frequencyOptions.frequencyStrategyTTL;

    if (normOptions.frequencyOptions.frequencyStrategy === 'memory-cache') {
      memDataCache.set(frequencyStrategyKey, {
        expiresAt: expiresAt,
        result: endpointResult as EndpointResult<unknown, ResultErrorType>,
      });
    }

    if (normOptions.frequencyOptions.frequencyStrategy === 'session-cache') {
      sessionStorage.setItem(
        frequencyStrategyKey,
        jsonStringify({
          expiresAt: expiresAt,
          result: endpointResult,
        })
      );
    }
  }

  return endpointResult;
}
