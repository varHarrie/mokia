import * as decorator from '@mokia/decorator';
import { generate } from '@mokia/producer';

type Mokia = typeof mock & typeof decorator;

const mock = <T>(schema: T) => generate(schema);

const mokia: Mokia = Object.assign(mock, decorator);

export = mokia;
