/* eslint-disable no-case-declarations */
import { hash } from '../../utilities/src/data/hash';
import { jsonStringify } from '../../utilities/src/data/json-stringify';
import { pick } from '../../utilities/src/data/pick';
import { EndpointOptions, EndpointResult } from './types';
import {
  handleRequest,
  handleResponse,
  isEndpointOptions,
  normalizeHeaders,
  normalizeOptions,
  normalizeUrl,
} from './utils';

/**
 * Calls an API endpoint and returns a standardized envelope containing data, error, and pagination results.
 */
export function callEndpoint<D = unknown, E = unknown, S = unknown>(
  url: string,
  options?: EndpointOptions,
  stateToInterpolate?: S
): Promise<EndpointResult<D, E>>;
export function callEndpoint<D = unknown, E = unknown, S = unknown>(
  url: string,
  stateToInterpolate?: S
): Promise<EndpointResult<D, E>>;
export function callEndpoint<D = unknown, E = unknown, S = unknown>(
  options: EndpointOptions,
  stateToInterpolate?: S
): Promise<EndpointResult<D, E>>;
export async function callEndpoint<D = unknown, E = unknown, S = unknown>(
  urlOrOptions: string | EndpointOptions,
  optionsOrStateToInterpolate?: EndpointOptions & S & boolean,
  stateToInterpolate?: S
): Promise<EndpointResult<D, E>> {
  const normOptions = normalizeOptions<S>(urlOrOptions, optionsOrStateToInterpolate);
  const isUrlOrOptionsActuallyOptions = isEndpointOptions<S>(urlOrOptions, stateToInterpolate);

  let normStateToInterpolate: S;

  if (isUrlOrOptionsActuallyOptions) {
    normStateToInterpolate = optionsOrStateToInterpolate as S;
  } else if (!isEndpointOptions<S>(optionsOrStateToInterpolate, stateToInterpolate)) {
    normStateToInterpolate = optionsOrStateToInterpolate as S;
  } else {
    normStateToInterpolate = stateToInterpolate || ({} as S);
  }

  const normUrlResult = normalizeUrl<S>(normOptions, normStateToInterpolate);

  if (
    normOptions.requestOptions.method !== 'GET' &&
    normOptions.requestOptions.method !== 'DELETE' &&
    normOptions.requestOptions.autoCreateBodyFromState &&
    !normOptions.requestOptions.body &&
    Object.keys(normUrlResult.unmatchedParamState).length
  ) {
    //
    // URL interpolation resulted in unmatched state and no body
    // was provided, so encode the state and use it as the body
    //
    const encodedState = jsonStringify(normUrlResult.unmatchedParamState);
    normOptions.requestOptions.body = encodedState;
  }

  let frequencyStrategyKey = normOptions.frequencyOptions.frequencyStrategyKey || '';

  try {
    if (!frequencyStrategyKey) {
      frequencyStrategyKey = await hash({ body: normOptions.requestOptions.body, normUrl: normUrlResult.url });
    }

    const normHeaders = await normalizeHeaders(normOptions);
    const requestResult = await handleRequest<D, E>(frequencyStrategyKey, normUrlResult, normOptions);

    if (!requestResult.needToCallFetch) {
      //
      // EARLY RETURN because of cache hit or throttle
      //
      return requestResult.cachedResult as EndpointResult<D, E>;
    }

    const fetchOptions = pick(normOptions.requestOptions, 'body', 'method', 'mode');
    const response = await fetch(normUrlResult.url, { ...fetchOptions, cache: 'no-store', headers: normHeaders });
    const responseResult = await handleResponse<D, E>(response, frequencyStrategyKey, normOptions);

    return responseResult as EndpointResult<D, E>;
    /* v8 ignore start */
  } catch (error) {
    return {
      error: `The endpoint call to ${normUrlResult.url} failed: ${error}`,
    } as EndpointResult<D, E>;
  }
}
