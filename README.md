# Alerty JavaScript SDK

[![NPM Version](https://img.shields.io/npm/v/@alerty/react.svg)](https://www.npmjs.com/package/@alerty/react)

Alerty SDK is a powerful monitoring tool designed, built, and priced for the needs of developers and founders. It helps you monitor your applications, track errors, and ensure your software runs smoothly.

## Features

- **Error Monitoring:** Automatically captures errors and their stack traces.
- **Service Monitoring:** Monitors the health and performance of your services.
- **Customizable Alerts:** Set up alerts to notify you when something goes wrong.
- **Lightweight and Fast:** Designed to be efficient with minimal overhead.

## Supported Platforms

For each major JavaScript platform, there is a specific high-level SDK that provides all the tools you need in a single package. Please refer to the README and instructions of those SDKs for more detailed information:

- [`@alerty/node`](https://github.com/alerty-ai/alerty-js/tree/main/packages/node): SDK for Node
- [`@alerty/react`](https://github.com/alerty-ai/alerty-js/tree/main/packages/react): SDK for React
- [`@alerty/nextjs`](https://github.com/alerty-ai/alerty-js/tree/main/packages/nextjs): SDK for Next.js

## Usage

You can install the Alerty SDK via npm (see specific instructions for each platform above):

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

Data should be flowing now!

## License

Alerty SDK is released under the [MIT License](https://github.com/alerty-ai/alerty-js/blob/main/LICENSE).
