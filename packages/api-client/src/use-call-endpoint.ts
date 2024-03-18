import { useCallback, useState } from 'react';
import { deepClone } from '../../utilities/src/data/deep-clone';
import { deepMerge } from '../../utilities/src/data/deep-merge';
import { normalizeError } from '../../utilities/src/errors/normalize-error';
import { callEndpoint } from './call-endpoint';
import {
  EndpointOptions,
  EndpointResult,
  NormEndpointOptionsDefaults,
  UseCallEndpointExecute,
  UseCallEndpointExecuteOptions,
  UseCallEndpointTuple,
} from './types';
import { normalizeOptions } from './utils';

export const INVALID_METHOD_FOR_APPEND_DATA = 'appendData is only supported for GET requests';
export const NON_ARRAY_APPEND_DATA = 'WARNING: appendData is only supported for array data and result was not an array';

/**
 * React hook that returns a tuple containing the following positional elments:
 * 1. function that calls an API endpoint
 * 2. endpoint result
 * 3. flag indicating if call is pending
 * 4. function that clears the endpoint result
 *
 * E.g. const [execute, result, pending, clearResult] = useCallEndpoint();
 *
 * @param url - URL of the endpoint to call (can omit and just pass options)
 * @param options - options for the endpoint call
 * @param appendData - flag indicating if data should be appended to existing data, which is useful for infinite scrolling scenarios where auto-pagination is desired.
 */
export function useCallEndpoint<D = unknown, E = unknown, S = unknown>(url: string): UseCallEndpointTuple<D, E, S>;
export function useCallEndpoint<D = unknown, E = unknown, S = unknown>(
  url: string,
  options: EndpointOptions
): UseCallEndpointTuple<D, E, S>;
export function useCallEndpoint<D = unknown, E = unknown, S = unknown>(
  url: string,
  appendData: boolean
): UseCallEndpointTuple<D, E, S>;
export function useCallEndpoint<D = unknown, E = unknown, S = unknown>(
  url: string,
  options: EndpointOptions,
  appendData: boolean
): UseCallEndpointTuple<D, E, S>;
export function useCallEndpoint<D = unknown, E = unknown, S = unknown>(
  options: EndpointOptions
): UseCallEndpointTuple<D, E, S>;
export function useCallEndpoint<D = unknown, E = unknown, S = unknown>(
  options: EndpointOptions,
  appendData: boolean
): UseCallEndpointTuple<D, E, S>;
export function useCallEndpoint<D = unknown, E = unknown, S = unknown>(
  urlOrOptions: string | EndpointOptions,
  optionsOrAppendData?: EndpointOptions | boolean,
  appendData?: boolean
): UseCallEndpointTuple<D, E, S> {
  const [result, setResult] = useState<EndpointResult<D, E>>();
  const [pending, setPending] = useState(false);

  const execute = useCallback<UseCallEndpointExecute<S>>(
    async (execOptionsOrState, state) => {
      setPending(true);

      const normAppendData = typeof optionsOrAppendData === 'boolean' ? optionsOrAppendData : appendData;

      try {
        const normOptions = normalizeOptions<S>(
          urlOrOptions,
          optionsOrAppendData as (EndpointOptions & S & boolean) | undefined
        );

        const normExecOptions = execOptionsOrState as UseCallEndpointExecuteOptions;
        let normState = state as S;

        if (
          normExecOptions?.body ||
          normExecOptions?.pageToken ||
          normExecOptions?.recordSkip ||
          normExecOptions?.signal
        ) {
          normOptions.requestOptions = deepMerge(normOptions.requestOptions, normExecOptions);
        } else {
          normState = execOptionsOrState as S;
        }

        if (normAppendData) {
          if (normOptions?.requestOptions?.method && normOptions.requestOptions.method !== 'GET') {
            throw new Error(INVALID_METHOD_FOR_APPEND_DATA);
          }
        }

        if (result?.data && normAppendData) {
          if (result && result?.data) {
            if (Array.isArray(result?.data)) {
              if (result.nextPageToken) {
                //
                // endpoint returned a next page token, so add it to the request
                //
                (normOptions as NormEndpointOptionsDefaults).requestOptions.pageToken = result?.nextPageToken;
              }

              if (result.total) {
                //
                // endpoint returned a record total so set the record skip value
                //
                (normOptions as NormEndpointOptionsDefaults).requestOptions.recordSkip = result.data.length;
              }

              if (
                (result.total && normOptions.requestOptions.recordSkip && result.data.length >= result.total) ||
                (!normOptions.requestOptions.recordSkip && !result?.nextPageToken)
              ) {
                //
                // EARLY RETURN because there's no more pages to fetch
                //
                return;
              }
            } else {
              console.error(NON_ARRAY_APPEND_DATA);

              //
              // EARLY RETURN because non-array data returned
              //
              return;
            }
          }
        }

        const newResult = await callEndpoint<D, E>(normOptions, normState);

        if (newResult?.error) {
          if (normAppendData) {
            setResult((prevResult) => {
              const normPrevResult = deepMerge(prevResult, newResult);
              return normPrevResult as EndpointResult<D, E>;
            });
          } else {
            setResult(newResult);
          }
          //
          // EARLY RETURN because error returned
          //
          return;
        }

        if (!normAppendData || (normAppendData && !Array.isArray(result?.data))) {
          setResult(newResult);

          if (normAppendData && newResult?.data && !Array.isArray(newResult?.data)) {
            console.error(NON_ARRAY_APPEND_DATA);
          }

          //
          // EARLY RETURN because we don't want to append data
          //
          return;
        }

        // caller wants to append data and there were no errors,
        // so merge the new data with the existing data (if any)
        if (newResult?.data) {
          setResult((prevResult) => {
            let normNewResult = deepClone(prevResult);
            delete normNewResult?.nextPageToken;
            delete normNewResult?.total;

            if (!normNewResult?.data) {
              normNewResult = {
                ...normNewResult,
                data: newResult.data,
                error: newResult.error,
              };
            } else {
              normNewResult = {
                ...normNewResult,
                data: deepMerge(normNewResult.data, newResult.data),
                error: newResult.error,
              };
            }

            if (newResult.nextPageToken) {
              normNewResult.nextPageToken = newResult.nextPageToken;
            }

            if (newResult.total) {
              normNewResult.total = newResult.total;
            }

            return normNewResult;
          });
        }
      } catch (error) {
        const err = normalizeError(error);

        if (!normAppendData) {
          setResult({
            error: err.message,
          } as EndpointResult<D, E>);
        } else {
          setResult((prevResult) => {
            return {
              ...prevResult,
              error: err.message,
            } as EndpointResult<D, E>;
          });
        }
      } finally {
        setPending(false);
      }
    },
    [appendData, optionsOrAppendData, result, urlOrOptions]
  );

  const clearResult = useCallback(() => {
    return new Promise<void>((resolve) => {
      setResult(undefined);
      resolve();
    });
  }, []);

  return [execute, result, pending, clearResult];
}
