# Alerty React SDK

[![NPM Version](https://img.shields.io/npm/v/@alerty/react.svg)](https://www.npmjs.com/package/@alerty/react)

Alerty SDK is a powerful monitoring tool designed, built, and priced for the needs of developers and founders. It helps you monitor your applications, track errors, and ensure your software runs smoothly.

## Features

- **Error Monitoring:** Automatically captures errors and their stack traces.
- **Service Monitoring:** Monitors the health and performance of your services.
- **Customizable Alerts:** Set up alerts to notify you when something goes wrong.
- **Lightweight and Fast:** Designed to be efficient with minimal overhead.

## Usage

You can install the Alerty SDK via npm:

```sh
npm install @alerty/react
```

In a React application, initialize Alerty SDK in your main entry file, typically `index.js` or `App.js`:

```javascript
import * as Alerty from "@alerty/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

Alerty.configure({
  dsn: process.env.ALERTY_DSN,
});

ReactDOM.render(<App />, document.getElementById("root"));
```

Data should be flowing now!

## License

Alerty SDK is released under the [MIT License](LICENSE).
