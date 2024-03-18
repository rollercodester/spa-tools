import { EndpointCacheModel } from '../types';

export const memDataCache: Map<string, EndpointCacheModel<unknown, unknown>> = new Map();

export function getSessionCacheHitInfoLogMsg(normUrl: string) {
  return `INFO: The endpoint call to ${normUrl} was returned from session cache.`;
}
