export const BUFFER_ENC = 'base64';
export const OBFI = 'x1oZZljV8/aQ1zW4b0+IVw==';
export const OBFK = 'aLUlSYyS3HPWvSzRx96hkSx7ldIFAeC/FDfBUWc3H7U=';

export type Environment = 'development' | 'test' | 'production';

export type RuntimeHostname = string;

export interface BaseConfigSettings<E = Environment> {
  environment: E;
}

export type DomainConfig<S> = Record<RuntimeHostname, S>;

export interface RuntimeConfigOptions {
  localhostIpAddress?: string;
  manualActiveHostname?: string;
  startsWithMatching?: boolean;
}
