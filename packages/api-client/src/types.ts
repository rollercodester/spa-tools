export interface EndpointCacheModel<ResultDataType, ResultErrorType> {
  expiresAt: number;
  result: EndpointResult<ResultDataType, ResultErrorType>;
}

export interface EndpointCallbackOptions {
  /**
   * Enables caller to asynchronously add headers to support scenarios where including an authorization header depends on an async call to an IdP, etc.
   */
  onAddHeaders?: () => Promise<Headers>;
  /**
   * Notifies caller when an endpoint response error occurs.
   */
  onResponseError?: (response: Response) => void;
}

export interface EndpointConsoleOptions {
  /**
   * Determines whether or not to log when the endpoint's `GET` requests are returned from cache or are throttled. Defaults to `false`.
   */
  logThrottleCacheHits?: boolean;
  /**
   * Determines whether or not to log warnings when the endpoint's `GET` requests are throttled beyond configured threshold. Defaults to `true`.
   */
  logThrottleWarnings?: boolean;
  /**
   * Determines how many times the endpoint's `GET` requests can be throttled before a warning is logged. Defaults to `10`.
   */
  logThrottleWarningsThreshold?: number;
}

export type EndpointFormEncodingType = 'multipart' | 'url';

export type EndpointFrequencyStrategy = 'throttle' | 'memory-cache' | 'session-cache' | 'none';

export interface EndpointFrequencyOptions {
  /**
   * Determines how often the endpoint's `GET` requests are cleaned up from the cache when the `frequencyStrategy` is set to `memory-cache` or `session-cache`. Defaults to `900` (15-minutes).
   */
  cacheCleanupIntervalSeconds?: number;
  /**
   * Optional frequency strategy that determines how duplicate endpoint requests are handled by the client. Defaults to `memory-cache` for `GET` requests and `throttle` for all other requests.
   *
   * - When set to `throttle` the endpoint call will be ignored when the same call has already been responded to within the call timeframe per `frequencyStrategyTTL`.
   * - When set to `memory-cache` the endpoint call's result data will be cached in memory and returned every time the same endpoint call is made within the call timeframe per `frequencyStrategyTTL`.
   * - When set to `session-cache` the endpoint call's result data will be cached locally using the browser's `sessionStorage` and returned every time the same endpoint call is made within the call timeframe per `frequencyStrategyTTL` across the browser tab's lifetime.
   * - When set to `none` the endpoint call will be executed every time it is made.
   *
   * Guidance:
   * - If the endpoint is primarily called from one place at a time in an application then the `throttle` strategy should be utilized.
   * - If a `GET` endpoint is called *concurrently* from multiple places in an applicaton then either the `memory-cache` or `session-cache` strategy should be utilized. The `memory-cache` strategy is preferred as it is more performant but the `session-cache` strategy is desirable when the client app wishes the cache to persist across hard refreshes for a browser tab without consuming memory.
   * - If an endpoint is called via a React hook then **NEVER** use the `none` strategy as it can potentially cause the endpoint to be called on every render.
   */
  frequencyStrategy?: EndpointFrequencyStrategy;
  /**
   * Optional string that will be used as the key to partition throttled/cached calls for the endpoint.
   *
   * If this value is not provided then the key will be automatically created using a hash algorithm.
   *
   * Guidance: It is advised to NOT provide the key and allow the hash to be generated; however there may be scenaiors where a client needs to take control over this key.
   */
  frequencyStrategyKey?: string;
  /**
   * Optional milliseconds that determines how often a unique endpoint request will be executed by the client. Defaults to `250'.
   *
   * This is only applicable to `GET` requests when the frequencyStrategy is set to `throttle`, `memory-cache`, or `session-cache`.
   */
  frequencyStrategyTTL?: number;
}

export interface EndpointInterpolateUrlOptions {
  /**
   * If true, any state that is not used to interpolate the URL will be added to the query string.
   */
  addUnusedStateToQueryString?: boolean;
  /**
   * If true, any query string placeholders that are not used to interpolate the URL will be discarded.
   */
  discardOrphanedQueryStringPlaceholders?: boolean;
  /**
   * If any keys provided, the respective values will be explicitly URI encoded.
   *
   * Browsers will automatically URI encode the query string values when the URL is requested but sometimes the consuming application may want to pre-encode the values, essentially double encoding them.
   *
   * An example is if a file path is passed as a query string value and backend expects the value to be double-encoded.
   */
  preEncodeQueryStringValuesForKeys?: string[];
}

export type EndpointMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type EndpointMode = 'cors' | 'no-cors' | 'same-origin';

export interface EndpointOptions {
  /**
   * Optional object that defines callbacks implemented by the consuming application.
   */
  callbackOptions?: EndpointCallbackOptions;
  /**
   * Optional object that determines when to log runtime feedback to the console.
   */
  consoleOptions?: EndpointConsoleOptions;
  /**
   * Optional object that defines how often duplicate calls are allowed as well as throttle and data cache settings.
   */
  frequencyOptions?: EndpointFrequencyOptions;
  /**
   * Optional object that defines how the endpoint's URL is interpolated.
   */
  interpolateUrlOptions?: EndpointInterpolateUrlOptions;
  /**
   * Optional object that defines the endpoint's request options.
   */
  requestOptions?: EndpointRequestOptions;
  /**
   * Optional object that defines server-side model/interface options for the endpoint.
   */
  serverModelOptions?: EndpointServerModelOptions;
}

export interface EndpointOptionsDefaults {
  consoleOptions?: EndpointConsoleOptions;
  frequencyOptions?: Omit<EndpointFrequencyOptions, 'frequencyStrategyKey'>;
  requestOptions?: Omit<EndpointRequestOptions, 'body' | 'signal' | 'url'>;
  serverModelOptions?: Omit<EndpointServerModelOptions, 'pageToken'>;
}

export interface EndpointRequestOptions {
  /**
   * If true, the endpoint will automatically create a body for the endpoint request when the `requestType` is `json` and the `body` is not provided. Defaults to `true`.
   */
  autoCreateBodyFromState?: boolean;
  /**
   * Optional body for the endpoint request.
   */
  body?: BodyInit;
  /**
   * If true, the endpoint will return an error when a `GET` request results in a 404. Defaults to `false`.
   *
   * Set to `true` when the application considers it an error when the requested resource is not found.
   */
  errorOn404?: boolean;
  /**
   * Encoding type for the endpoint request when the `requestType` is `form`. Defaults to `url`.
   *
   * - When set to `multipart` the endpoint request will be encoded as `multipart/form-data`.
   * - When set to `url` the endpoint request will be encoded as `application/x-www-form-urlencoded`.
   */
  formEncodingType?: EndpointFormEncodingType;
  /**
   * Optional method for the endpoint request. Defaults to `GET`.
   */
  method?: EndpointMethod;
  /**
   * Optional mode for the endpoint request. Defaults to `cors`.
   */
  mode?: EndpointMode;
  /**
   * Optional token to request the respective page of results for the endpoint's `GET` requests when the `requestType` is `json`.
   */
  pageToken?: string;
  /**
   * Optional limit for the endpoint request that determines how many records are returned. Defaults to `100`.
   *
   * Pagination note: when the `requestType` is `json`, a next and/or previous page token may be returned if the respective endpoint's service has implemented pagination.
   */
  recordLimit?: number;
  /**
   * Optional number of records to skip for the endpoint request that determines which tells the server how man records to skip (i.e. essentially which record to begin with). Defaults to `0`.
   *
   */
  recordSkip?: number;
  /**
   * Optional type for the endpoint request. Defaults to `json`.
   */
  requestType?: EndpointRequestType;
  /**
   * Optional type for the endpoint response. Defaults to `json`.
   */
  responseType?: EndpointResponseType;
  /**
   * Optional signal for the endpoint request that enables ability to abort an in-progress request.
   */
  signal?: AbortSignal;
  /**
   * The endpoint's URL.
   */
  url?: string;
}

export type EndpointRequestType = 'form' | 'json' | 'text' | 'void';

export type EndpointResponseType = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text' | 'void';

/**
 * The response object returned by the endpoint as a single shape containing optional properties that describe result data, result error, and pagination tokens.
 */
export interface EndpointResult<ResultDataType = void, ResultErrorType = void> {
  /**
   * Optional property that describes the endpoint's resulting data via any supported type.
   *
   * Examples include a primitive (`string`, `boolean`, `number`), singular object or plural (array of objects or primitives), etc.
   */
  data?: ResultDataType;
  /**
   * Optional property that describes the endpoint's resulting error via any supported type.
   *
   * Examples include a string message, an object with error details, an error code that maps to a message maintained by clients, etc.
   */
  error?: ResultErrorType;
  /**
   * Optional token that can be used to request the next page of results for the endpoint's `GET` requests.
   */
  nextPageToken?: string;
  /**
   * Optional token that can be used to request the previous page of results for the endpoint's `GET` requests.
   */
  previousPageToken?: string;
  /**
   * Optional property that describes the total number of records available for the endpoint's `GET` requests.
   */
  total?: number;
}

export interface EndpointServerModelOptions {
  /**
   * The dot path for a response that points to a root data property when the `responseType` is `json`. Defaults to ``.
   *
   * For example, if the response is `{ "myData": { "foo": "bar" } }` then the `jsonDataDotPath` would be `myData`.
   */
  jsonDataDotPath?: string;
  /**
   * The dot path for a response that points to the root error property when the `responseType` is `json`. Defaults to ``.
   */
  jsonErrorDotPath?: string;
  /**
   * The dot path for a response that points to the next page token property when the `responseType` is `json`. Defaults to `nextPageToken`.
   */
  jsonNextPageTokenDotPath?: string;
  /**
   * The dot path for a response that points to the previous page token property when the `responseType` is `json`. Defaults to `previousPageToken`.
   */
  jsonPreviousPageTokenDotPath?: string;
  /**
   * The dot path for a response that returns the record total for all available pages based on the limit parameter when the `responseType` is `json`. Defaults to `total`.
   */
  jsonTotalDotPath?: string;
  /**
   * Optional query parameter name for the endpoint request that determines which page of results are returned. Defaults to `pageToken`.
   */
  pageTokenQueryParamName?: string;
  /**
   * Optional query parameter name for the endpoint request that determines how many records are returned. Defaults to `limit`.
   */
  recordLimitQueryParamName?: string;
  /**
   * Optional query parameter name for the endpoint request that determines how many records are skpped before returning. Defaults to `skip`.
   */
  recordSkipQueryParamName?: string;
}

export interface NormEndpointOptionsDefaults {
  consoleOptions: Required<EndpointConsoleOptions>;
  frequencyOptions: Required<Omit<EndpointFrequencyOptions, 'frequencyStrategyKey'>>;
  interpolateUrlOptions: Required<EndpointInterpolateUrlOptions>;
  requestOptions: Required<Omit<EndpointRequestOptions, 'body' | 'signal' | 'url'>>;
  serverModelOptions: Required<Omit<EndpointServerModelOptions, 'pageToken' | 'recordSkip'>>;
}

export type UseCallEndpointExecuteOptions = Pick<
  EndpointRequestOptions,
  'body' | 'pageToken' | 'recordSkip' | 'signal'
>;

export type UseCallEndpointExecute<StateDataType = unknown> = (
  options?: UseCallEndpointExecuteOptions | StateDataType,
  stateToInterpolate?: StateDataType
) => Promise<void>;

export type UseCallEndpointTuple<ResultDataType = unknown, ResultErrorType = unknown, StateDataType = unknown> = [
  execute: UseCallEndpointExecute<StateDataType>,
  result: EndpointResult<ResultDataType, ResultErrorType> | undefined,
  pending: boolean,
  clearResult: () => Promise<void>,
];
