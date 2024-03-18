import { EndpointOptions } from '../types';

export function isEndpointOptions<StateDataType = unknown>(
  urlOrOptionsOrState?: string | EndpointOptions | StateDataType,
  state?: StateDataType
) {
  return (
    typeof urlOrOptionsOrState === 'object' &&
    ((typeof state === 'object' && !!state) ||
      !!(urlOrOptionsOrState as EndpointOptions).callbackOptions ||
      !!(urlOrOptionsOrState as EndpointOptions).consoleOptions ||
      !!(urlOrOptionsOrState as EndpointOptions).frequencyOptions ||
      !!(urlOrOptionsOrState as EndpointOptions).interpolateUrlOptions ||
      !!(urlOrOptionsOrState as EndpointOptions).requestOptions ||
      !!(urlOrOptionsOrState as EndpointOptions).serverModelOptions)
  );
}
