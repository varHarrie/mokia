# 0.5.0 (2021-09-09)

### Features

- **cli:** improve watch mode
- **server:** add `context` option, default to `producer`
- **server:** add `bodyWrapper` option, default to `producer.generate`
- **server:** add `delay` option
- **server:** add `middlewares` option
- **server:** add `proxy` option to replace `preferredUrl` and `fallbackUrl`
- **producer:** add `pagination` producer
- **producer:** add `imageDataURL` producer to replace `image` and `dataImage`
- **decorator:** improve createDecorator implementation and types.
- **mokia:** add `defineConfig` export

### BREAKING CHANGES

- **server:** remove `preferredUrl` and `fallbackUrl`
- **producer:** remove `image` and `dataImage`
- **mokia:** update exports, only export `mokia` as default
