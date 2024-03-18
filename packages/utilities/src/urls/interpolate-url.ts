import { isRecord } from '../conditionals';
import { deepClone } from '../data';

const PLACEHOLDER_PREFIX = ':';

/**
 * Interpolates a URL template with provided state.
 */
export function interpolateUrl<S = Record<string, never>>(
  urlTemplate: string,
  state: S = {} as S,
  options = {} as InterpolateUrlOptions
): InterpolateUrlResult<S> {
  if (!isRecord(state)) {
    throw new Error(`state must be a plain object (e.g. Record<string, unknown>)`);
  }

  const defautlOptions: InterpolateUrlOptions = {
    addUnusedStateToQueryString: false,
    discardOrphanedQueryStringPlaceholders: true,
    preEncodeQueryStringValuesForKeys: [],
  };

  const normOptions = { ...defautlOptions, ...options };
  const url = new URL(urlTemplate);
  const normState = deepClone(state);
  const unmatchedParamState = deepClone(state) as Partial<S>;
  const path = interpolateUrlParams<S>(url.pathname, normState, unmatchedParamState);
  const search = decodeURIComponent(url.searchParams.toString());

  const explicitSearchItems = interpolateExplicitQuery(search, normState, unmatchedParamState, normOptions);
  const implicitSearchItems = interpolateImplicitQuery(unmatchedParamState, normOptions);

  const newSearch = [...explicitSearchItems, ...implicitSearchItems].join('&');
  const newUrl = `${url.origin}${path}${newSearch ? `?${newSearch}` : ''}${url.hash}`;

  return { unmatchedParamState: normOptions.addUnusedStateToQueryString ? {} : unmatchedParamState, url: newUrl };
}

//
//
// helpers
//
//

function interpolateExplicitQuery<S = Record<string, never>>(
  querystring: string,
  state: S,
  unmatchedParamState: Partial<S>,
  options: InterpolateUrlOptions
) {
  const explicitQuerySegments = querystring.split('&').reduce<string[]>((segments, segment) => {
    if (segment.includes(PLACEHOLDER_PREFIX)) {
      const segmentKvp = segment.split('=');
      const segmentKey = segmentKvp[0];
      let segmentVal = String(segmentKvp[1]);
      const segmentSubVals = segmentVal.split(',');

      const newSegmentSubVals = segmentSubVals.reduce<string[]>((subVals, subVal) => {
        if (subVal.startsWith(PLACEHOLDER_PREFIX)) {
          const stateKey = subVal.split(PLACEHOLDER_PREFIX)[1];

          if (!stateKey) {
            return subVals;
          }

          const stateVal = (state as Record<string, unknown>)[stateKey];

          delete (unmatchedParamState as Record<string, unknown>)[stateKey];

          const newVal = typeof stateVal !== 'undefined' ? String(stateVal) : '';

          if (!options.discardOrphanedQueryStringPlaceholders || newVal) {
            subVals.push(
              // if pre-encode key is found, then encode the value
              options.preEncodeQueryStringValuesForKeys?.some((key) => key === stateKey)
                ? encodeURIComponent(newVal)
                : newVal
            );
          }
        } else {
          subVals.push(subVal);
        }

        return subVals;
      }, []);

      segmentVal = newSegmentSubVals.join(',');

      const newSegment =
        !options.discardOrphanedQueryStringPlaceholders || segmentVal ? `${segmentKey}=${segmentVal}` : undefined;

      if (newSegment) {
        segments.push(newSegment);
      }
    } else if (segment) {
      segments.push(segment);
    }

    return segments;
  }, []);

  return explicitQuerySegments;
}

function interpolateImplicitQuery<S = Record<string, never>>(unmatchedParamState: S, options: InterpolateUrlOptions) {
  if (!options.addUnusedStateToQueryString) {
    return [];
  }

  const implicitQuerySegments = Object.keys(unmatchedParamState as Record<string, unknown>)
    .filter((key) => typeof (unmatchedParamState as Record<string, unknown>)[key] !== 'undefined')
    .map((key) => {
      const stateVals = String((unmatchedParamState as Record<string, unknown>)[key]).split(',');

      return stateVals.reduce((newQuery, stateVal, idx) => {
        newQuery += `${idx > 0 ? '&' : ''}${key}=${String(stateVal)}`;

        return newQuery;
      }, '');
    });

  return implicitQuerySegments;
}

function interpolateUrlParams<S = Record<string, never>>(path: string, state: S, unmatchedParamState: Partial<S>) {
  const newSegments = path.split('/').map((segment) => {
    const normSegment = decodeURIComponent(segment);

    if (normSegment.startsWith(PLACEHOLDER_PREFIX)) {
      const stateKey = normSegment.split(PLACEHOLDER_PREFIX)[1];

      if (stateKey) {
        const stateVal = (state as Record<string, unknown>)[stateKey];

        delete (unmatchedParamState as Record<string, unknown>)[stateKey];

        if (typeof stateVal !== 'undefined') {
          return stateVal;
        }
      }
    }

    return normSegment;
  });

  return newSegments.join('/');
}

//
//
// types
//
//

export interface InterpolateUrlOptions {
  /**
   * If true, any state that is not used to interpolate the URL will be added to the query string.
   */
  addUnusedStateToQueryString?: boolean;
  /**
   * If true, any query string placeholders that are not used to interpolate the URL will be discarded.
   */
  discardOrphanedQueryStringPlaceholders?: boolean;
  /**
   * If true, any query string values will be URI encoded.
   */
  preEncodeQueryStringValuesForKeys?: string[];
}

/**
 * Result of interpolating a URL template with provided state.
 */
export interface InterpolateUrlResult<S = Record<string, unknown>> {
  /**
   * State that was not used to interpolate the URL.
   */
  unmatchedParamState: Partial<S>;
  /**
   * The interpolated URL.
   */
  url: string;
}
