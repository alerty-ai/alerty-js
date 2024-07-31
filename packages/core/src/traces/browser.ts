import { AlertyConfig } from "../config";
import { isBrowserEnvironment } from "../utils";
import {
  captureError,
  registerTraceProvider,
  TraceProviderKind,
} from "./utils";

export const registerBrowserTracer = (config: AlertyConfig) => {
  if (!isBrowserEnvironment()) {
    return;
  }

  if (config.debug) {
    console.info("Registering browser trace provider");
  }

  window.onerror = (message, _, __, ___, error) => {
    captureError(error || message.toString());
    return false; // Prevents the default browser error handling.
  };

  window.onunhandledrejection = (event) => {
    captureError(event.reason);
  };

  return registerTraceProvider(TraceProviderKind.Browser, config);
};
