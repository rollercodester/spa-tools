import { looksLikeBase64 } from '../../../utilities/src/conditionals/looks-like-base64';
import { browserDeobfuscateConfig } from '../browser-obfuscation';
import { BaseConfigSettings, DomainConfig, Environment, RuntimeConfigOptions, RuntimeHostname } from '../types';

export const DEFAULT_LOCALHOST_IP_ADDRESS = '127.0.0.1';
export const RUNTIME_HOSTNAME_ERROR =
  'Runtime hostname could not be determined. If you are running outside of a browser then be sure that the `manualActiveHostname` option is being set.';
export const OBF_STRING_ERROR = 'Obfuscated domain-config string detected. Use `initializeObf` method instead.';
export const NON_OBF_STRING_ERROR = 'Non-obfuscated string detected. Use `initialize` method instead.';

export class RuntimeConfig<S extends BaseConfigSettings<E>, E = Environment> {
  private readonly localhostIpAddress: string;
  private readonly manualActiveHostname: string;
  private readonly startsWithMatching: boolean;
  private domainConfig: DomainConfig<S> = {} as DomainConfig<S>;

  private constructor(domainConfig: DomainConfig<S>, options?: RuntimeConfigOptions) {
    this.domainConfig = domainConfig;
    this.localhostIpAddress = options?.localhostIpAddress || DEFAULT_LOCALHOST_IP_ADDRESS;
    this.manualActiveHostname = options?.manualActiveHostname || '';
    this.startsWithMatching = options?.startsWithMatching || false;
  }

  public static initialize<S extends BaseConfigSettings<E>, E = Environment>(
    domainConfig: DomainConfig<S> | string,
    options?: RuntimeConfigOptions
  ) {
    let normDc: DomainConfig<S> = typeof domainConfig === 'string' ? ({} as DomainConfig<S>) : domainConfig;

    if (typeof domainConfig === 'string') {
      if (looksLikeBase64(domainConfig)) {
        throw new Error(OBF_STRING_ERROR);
      }

      normDc = JSON.parse(domainConfig) as DomainConfig<S>;
    }

    const runtimeConfig = new RuntimeConfig<S, E>(normDc, options);
    return runtimeConfig;
  }

  public static async initializeObf<S extends BaseConfigSettings<E>, E = Environment>(
    obfuscatedConfig: string,
    options?: RuntimeConfigOptions
  ) {
    if (!looksLikeBase64(obfuscatedConfig)) {
      throw new Error(NON_OBF_STRING_ERROR);
    }
    const domainConfig = await browserDeobfuscateConfig<S>(obfuscatedConfig);
    const runtimeConfig = new RuntimeConfig<S, E>(domainConfig, options);
    return runtimeConfig;
  }

  public get settings(): S {
    let normConfig: S | undefined;

    if (this.startsWithMatching) {
      normConfig = Object.keys(this.domainConfig).reduce((acc: S | undefined, key: string) => {
        if (key === this.hostname) {
          // even though consumer elected to use startsWithMatching, we still want to prioritize
          // exact matches on the hostname to support not using an env path for production
          return this.domainConfig[key];
        }

        if (this.hostname.startsWith(key)) {
          return this.domainConfig[key];
        }

        return acc;
      }, undefined);
    } else {
      normConfig = this.domainConfig[this.hostname];
    }

    if (!normConfig) {
      throw new Error(getNoRuntimeConfigError(this.hostname));
    }

    return normConfig as S;
  }

  private get hostname(): RuntimeHostname {
    const normHostname =
      typeof window !== 'undefined' && window.location
        ? this.startsWithMatching
          ? `${window.location.host}${window.location.pathname}`
          : window.location.hostname
        : this.manualActiveHostname;

    return normHostname;
  }

  public get isRunningLocal(): boolean {
    return this.startsWithMatching
      ? this.hostname.startsWith('localhost') || this.hostname.startsWith(this.localhostIpAddress)
      : this.hostname === 'localhost' || this.hostname === this.localhostIpAddress;
  }
}

//
//
// helpers
//
//

export function getNoRuntimeConfigError(hostname: string): string {
  return `No runtime configuration found matching: ${hostname}. If you are running outside of a browser then be sure that the \`serverSideHostname\` option is being set.`;
}
