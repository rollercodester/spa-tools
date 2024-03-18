import { InterpolateUrlResult, interpolateUrl } from '../../../utilities/src/urls/interpolate-url';
import { EndpointOptions } from '../types';

export function normalizeUrl<StateDataType = unknown>(
  normOptions: EndpointOptions,
  stateToInterpolate?: StateDataType
) {
  let normalizedUrl = normOptions.requestOptions?.url || '';

  if (!normalizedUrl) {
    throw new Error('requestOptions.url is required');
  }

  if (normOptions.requestOptions?.method === 'GET') {
    const url = new URL(normalizedUrl);

    if (normOptions.requestOptions.recordLimit && normOptions.serverModelOptions?.recordLimitQueryParamName) {
      url.searchParams.set(
        normOptions.serverModelOptions.recordLimitQueryParamName,
        normOptions.requestOptions.recordLimit.toString()
      );
    }

    if (normOptions.requestOptions.recordSkip && normOptions.serverModelOptions?.recordSkipQueryParamName) {
      url.searchParams.set(
        normOptions.serverModelOptions.recordSkipQueryParamName,
        normOptions.requestOptions.recordSkip.toString()
      );
    }

    if (
      normOptions.requestOptions.requestType === 'json' &&
      normOptions.requestOptions?.pageToken &&
      normOptions.serverModelOptions?.pageTokenQueryParamName
    ) {
      url.searchParams.set(
        normOptions.serverModelOptions.pageTokenQueryParamName,
        normOptions.requestOptions.pageToken
      );
    }

    normalizedUrl = url.toString();
  }

  let result: InterpolateUrlResult<StateDataType> = { unmatchedParamState: {}, url: normalizedUrl };

  if (stateToInterpolate) {
    result = interpolateUrl<StateDataType>(normalizedUrl, stateToInterpolate, normOptions.interpolateUrlOptions);
  }

  return result;
}
