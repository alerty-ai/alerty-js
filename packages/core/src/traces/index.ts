import { AlertyConfig } from "../config";
import { registerBrowserTracer } from "./browser";
import { registerNodeTracer } from "./node";

export const registerTraces = (config: AlertyConfig) => {
  registerNodeTracer(config);
  registerBrowserTracer(config);
};
