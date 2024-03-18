import { getNestedValue } from '../../../utilities/src/data/get-nested-value';
import { optionsDefaults } from '../set-options-defaults';
import { EndpointResult, EndpointServerModelOptions } from '../types';

/**
 * Handles a response from an endpoint that returns JSON data.
 *
 * Note that the `response.text()` function is intentionally used below instead of `response.json()` as the latter call would fail when an external API endpoint returns JSON without specifying a response content-type of `application/json`.
 */
export async function handleJsonResponse<ResultDataType = unknown, ResultErrorType = unknown>({
  jsonDataDotPath,
  jsonErrorDotPath,
  jsonNextPageTokenDotPath,
  jsonPreviousPageTokenDotPath,
  jsonTotalDotPath,
  response,
}: HandleJsonResponseOptions): Promise<EndpointResult<ResultDataType, ResultErrorType> | null> {
  let text = '';
  try {
    text = response.status !== 404 ? await response.text() : '';

    if (text) {
      const json = JSON.parse(text);

      const error = getNestedValue(json, jsonErrorDotPath || optionsDefaults.serverModelOptions.jsonErrorDotPath, '');
      if (error) {
        // the response contained an error, so return it
        return {
          error,
        } satisfies EndpointResult<ResultDataType, ResultErrorType>;
      }

      const nextPageToken = getNestedValue(
        json,
        jsonNextPageTokenDotPath || optionsDefaults.serverModelOptions.jsonNextPageTokenDotPath,
        ''
      );

      const previousPageToken = getNestedValue(
        json,
        jsonPreviousPageTokenDotPath || optionsDefaults.serverModelOptions.jsonPreviousPageTokenDotPath,
        ''
      );

      const total = getNestedValue<number>(
        json,
        jsonTotalDotPath || optionsDefaults.serverModelOptions.jsonTotalDotPath,
        0
      );

      let data = json;
      if (jsonDataDotPath || optionsDefaults.serverModelOptions.jsonDataDotPath) {
        data = getNestedValue(json, jsonDataDotPath || optionsDefaults.serverModelOptions.jsonDataDotPath, '');
      }

      if (data) {
        // the response contained data, so return it
        return {
          data,
          nextPageToken,
          previousPageToken,
          total,
        } satisfies EndpointResult<ResultDataType, ResultErrorType>;
      }
    }

    return null;
  } catch {
    return {
      error: 'The response returned invalid JSON',
    } as EndpointResult<ResultDataType, ResultErrorType>;
  }
}

//
//
// local types
//
//

interface HandleJsonResponseOptions
  extends Pick<
    EndpointServerModelOptions,
    | 'jsonDataDotPath'
    | 'jsonErrorDotPath'
    | 'jsonNextPageTokenDotPath'
    | 'jsonPreviousPageTokenDotPath'
    | 'jsonTotalDotPath'
  > {
  response: Response;
}
