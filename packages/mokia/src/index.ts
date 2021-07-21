import * as decorator from '@mokia/decorator';
import * as producer from '@mokia/producer';

type Mokia = typeof mock & typeof decorator & { producer: typeof producer };

const mock = <T>(schema: T) => producer.generate<T>(schema);

const mokia: Mokia = Object.assign(mock, decorator, { producer });

export = mokia;
