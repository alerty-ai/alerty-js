# Alerty SDK

[![NPM Version](https://img.shields.io/npm/v/@alerty/nextjs.svg)](https://www.npmjs.com/package/@alerty/nextjs) [![License](https://img.shields.io/npm/l/@alerty/nextjs.svg)](https://github.com/zeet-co/alerty-sdk/blob/main/LICENSE)

Alerty SDK is a powerful monitoring tool designed, built, and priced for the needs of developers and founders. It helps you monitor your applications, track errors, and ensure your software runs smoothly.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Error Monitoring:** Automatically captures errors and their stack traces.
- **Service Monitoring:** Monitors the health and performance of your services.
- **Customizable Alerts:** Set up alerts to notify you when something goes wrong.
- **Lightweight and Fast:** Designed to be efficient with minimal overhead.

## Installation

You can install the Alerty SDK via npm or yarn:

```sh
# Using npm
npm install @alerty/nextjs

# Using yarn
yarn add @alerty/nextjs
```

## Usage

To start using Alerty SDK, initialize it in your project:

```javascript
import * as Alerty from "@alerty/nextjs";

Alerty.configure({
  dsn: process.env.ALERTY_DSN,
});
```

## Configuration

The `init` function accepts the following configuration options:

- `serviceName` (string): The name of your service.
- `serviceVersion` (string): The version of your service.
- `deploymentEnvironment` (string): The environment your service is running in (e.g., local, staging, production).

## Examples

### Next.js

In a Next.js application, you can initialize Alerty SDK in `pages/_app.js`:

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

### Node.js

In a Node.js application, initialize Alerty SDK at the entry point of your application:

```javascript
const Alerty = require("@alerty/node");

Alerty.configure({
  dsn: process.env.ALERTY_DSN,
});

// Rest of your application code
```

### React

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

## Contributing

We welcome contributions to improve the Alerty SDK! Please check out our [contributing guidelines](CONTRIBUTING.md) for more details.

## License

Alerty SDK is released under the [MIT License](LICENSE).
