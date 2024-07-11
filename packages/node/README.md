# Alerty Node SDK

[![NPM Version](https://img.shields.io/npm/v/@alerty/node.svg)](https://www.npmjs.com/package/@alerty/node)

Alerty SDK is a powerful monitoring tool designed, built, and priced for the needs of developers and founders. It helps you monitor your applications, track errors, and ensure your software runs smoothly.

## Features

- **Error Monitoring:** Automatically captures errors and their stack traces.
- **Service Monitoring:** Monitors the health and performance of your services.
- **Customizable Alerts:** Set up alerts to notify you when something goes wrong.
- **Lightweight and Fast:** Designed to be efficient with minimal overhead.

## Getting Started

You can install the Alerty SDK via npm:

```sh
npm install @alerty/node
```

To start using Alerty SDK, initialize it in your project:

```javascript
import * as Alerty from "@alerty/node";

Alerty.configure({
  dsn: "__YOUR_DSN__",
});
```

### Database Monitoring

If you also want to monitor your database, Alerty integrates with the following ORM libraries:

#### Prisma

First, in the generator block of your `schema.prisma` file, enable the `tracing` feature flag:

```javascript
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["tracing"]
}
```

Install the instrumentation dependency:

```sh
npm install @prisma/instrumentation@latest --save
```

Add `PrismaInstrumentation` to the `instrumentations` option and capture the `error` events:

```javascript
import { PrismaInstrumentation } from '@prisma/instrumentation'

// ...

Alerty.configure({
  dsn: "__YOUR_DSN__",
  instrumentations: [new PrismaInstrumentation()],
});

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "error"
    }
  ]
});

prisma.$on("error", (e) => {
  Alerty.captureError(
    new PrismaClientUnknownRequestError(e.message, {
      clientVersion: Prisma.prismaVersion.client,
    }),
  );
});
```

Data should be flowing now!

## License

Alerty SDK is released under the [MIT License](https://github.com/alerty-ai/alerty-js/blob/main/LICENSE).
