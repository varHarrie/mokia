import * as decorator from '@mokia/decorator';
import * as producer from '@mokia/producer';
import type { ServerConfig } from '@mokia/server';

type Mokia = typeof mock & typeof decorator & { producer: typeof producer; defineConfig: typeof defineConfig };

type MokiaUserConfig<T = typeof producer> = ServerConfig<T>;

const mock = <T>(schema: T) => producer.generate<T>(schema);

const defineConfig = <T>(config: MokiaUserConfig<T>): MokiaUserConfig<T> => config;

const mokia: Mokia = Object.assign(mock, decorator, { producer, defineConfig });

export = mokia;
