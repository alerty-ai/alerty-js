# Alerty Node SDK

[![NPM Version](https://img.shields.io/npm/v/@alerty/node.svg)](https://www.npmjs.com/package/@alerty/node)

Alerty SDK is a powerful monitoring tool designed, built, and priced for the needs of developers and founders. It helps you monitor your applications, track errors, and ensure your software runs smoothly.

## Features

- **Error Monitoring:** Automatically captures errors and their stack traces.
- **Service Monitoring:** Monitors the health and performance of your services.
- **Customizable Alerts:** Set up alerts to notify you when something goes wrong.
- **Lightweight and Fast:** Designed to be efficient with minimal overhead.

## Usage

You can install the Alerty SDK via npm:

```sh
npm install @alerty/node
```

To start using Alerty SDK, initialize it in your project:

```javascript
import * as Alerty from "@alerty/node";

Alerty.configure({
  dsn: process.env.ALERTY_DSN,
});
```

Data should be flowing now!

## License

Alerty SDK is released under the [MIT License](LICENSE).
