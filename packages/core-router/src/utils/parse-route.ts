import { deepClone } from '../../../utilities/src/data/deep-clone';
import { InterpolateUrlOptions, interpolateUrl } from '../../../utilities/src/urls/interpolate-url';
import { CoreRoute } from '../core-router';

export function parseRoute(
  route: CoreRoute,
  state = {} satisfies Record<string, unknown>,
  basePath = '',
  interpolateUrlOptions?: InterpolateUrlOptions
) {
  const normPath = route.path.startsWith('/') ? route.path : `/${route.path}`;
  const normState = deepClone(state);
  const pathTemplate = `${window.location.origin}${basePath}${normPath}`;
  const { url } = interpolateUrl(pathTemplate, normState, interpolateUrlOptions);
  const urlObj = new URL(url);

  return urlObj;
}
