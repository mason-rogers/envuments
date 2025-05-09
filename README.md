# Envuments - Your ideal config system

[![Downloads](https://img.shields.io/npm/dt/envuments.svg)](https://www.npmjs.com/package/envuments)
[![npm bundle size](https://img.shields.io/bundlephobia/min/envuments)](https://www.npmjs.com/package/envuments)
[![Version](https://img.shields.io/npm/v/envuments.svg)](https://www.npmjs.com/package/envuments)
[![License](https://img.shields.io/npm/l/envuments)](https://www.npmjs.com/package/envuments)

---

Envuments is an application configuration program that provides the ability to work with with .env files or your own seeded config.
The purpose of Envuments is to allow templating in your configuration files. Currently we support .env files as well as allowing you to seed your own config.
Syntax for templating and implementation can be found below.

When working with .env files, Envuments acts as an extension to the dotenv package which can be found [here](https://npmjs.com/dotenv).

&nbsp;

## Implementation

### .env

```env
APP_PORT=8443
APP_URL=http://localhost:${APP_PORT}
IS_PRODUCTION=true
```

### JavaScript usage exaple

```js
const { Envuments } = require('envuments');

const configValue = Envuments.get('APP_URL', 'https://viction.dev');

console.log(configValue); // http://localhost:8443
```

### TypeScript usage example (without annotations)

```ts
import { Envuments } from 'envuments';

const configValue = Envuments.get('APP_URL', 'https://viction.dev');

console.log(configValue); // http://localhost:8443
```

### TypeScript usage example (with annotations)

```ts
import { Env } from 'envuments';

class ExampleConfig {
   @Env('APP_URL', 'https://viction.dev')
   public readonly url: string;

   @Env('APP_PORT', 5123, Number)
   public readonly port: number;

   @Env('IS_PRODUCTION', false, Boolean)
   public readonly isProd: boolean;
}

const exampleConfig = new ExampleConfig();
console.log(exampleConfig.url); // http://localhost:8443

console.log(exampleConfig.port); // 8443

console.log(exampleConfig.isProd); // true
```

&nbsp;

## Seeding your own config

### index.js

```js
const { Envuments } = require('envuments');

Envuments.SeedConfig({
   APP_PORT: 8443,
   APP_URL: 'http://localhost:${APP_PORT}'
});

const config = new Envuments();

const configValue = config.get('APP_URL', 'https://viction.dev');

console.log(configValue); // http://localhost:8443
```

---

If you want any configuration methods to be implemented please [open an issue](https://github.com/victiondev/envuments/issues).
