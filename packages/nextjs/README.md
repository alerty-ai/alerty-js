# Alerty NextJS SDK

[![NPM Version](https://img.shields.io/npm/v/@alerty/nextjs.svg)](https://www.npmjs.com/package/@alerty/nextjs)

Alerty SDK is a powerful monitoring tool designed, built, and priced for the needs of developers and founders. It helps you monitor your applications, track errors, and ensure your software runs smoothly.

## Features

- **Error Monitoring:** Automatically captures errors and their stack traces.
- **Service Monitoring:** Monitors the health and performance of your services.
- **Customizable Alerts:** Set up alerts to notify you when something goes wrong.
- **Lightweight and Fast:** Designed to be efficient with minimal overhead.

## Usage

You can install the Alerty SDK via npm or yarn:

```sh
npm install @alerty/nextjs
```

```sh
yarn add @alerty/nextjs
```

In a Next.js application, you can initialize Alerty SDK in `app/layout.tsx`:

```javascript
import * as Alerty from "@alerty/nextjs";
import App from "next/app";

Alerty.configure({
  dsn: process.env.ALERTY_DSN,
});

class MyApp extends App {
  // Custom app logic
}

export default MyApp;
```

Data should be flowing now!

## License

Alerty SDK is released under the [MIT License](LICENSE).
