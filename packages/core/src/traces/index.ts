import { AlertyConfig } from "../config";
import { isBrowserEnvironment } from "../utils";

export const registerTraces = async (config: AlertyConfig) => {
  if (isBrowserEnvironment()) {
    const { registerBrowserTracer } = await import("./browser.js");
    registerBrowserTracer(config);
  }
};
