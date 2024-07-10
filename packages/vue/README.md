# Alerty Vue SDK

[![NPM Version](https://img.shields.io/npm/v/@alerty/vue.svg)](https://www.npmjs.com/package/@alerty/vue)

Alerty SDK is a powerful monitoring tool designed, built, and priced for the needs of developers and founders. It helps you monitor your applications, track errors, and ensure your software runs smoothly.

## Features

- **Error Monitoring:** Automatically captures errors and their stack traces.
- **Service Monitoring:** Monitors the health and performance of your services.
- **Customizable Alerts:** Set up alerts to notify you when something goes wrong.
- **Lightweight and Fast:** Designed to be efficient with minimal overhead.

## Getting Started

You can install the Alerty SDK via npm:

```sh
npm install @alerty/vue
```

In a Vue application, initialize Alerty SDK in your main entry file, typically `src/index.js`:

```javascript
import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";

import * as Alerty from "@alerty/vue";

Alerty.configure({
  dsn: "__YOUR_DSN__",
});

createApp(App).mount("#app");
```

Data should be flowing now!

## License

Alerty SDK is released under the [MIT License](https://github.com/alerty-ai/alerty-js/blob/main/LICENSE).
