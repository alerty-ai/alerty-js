import { AlertyConfig } from "../config";
import { isNodeEnvironment } from "../utils";
import { captureError } from "./captureError";
import { registerTraceProvider, TraceProviderKind } from "./utils";

export const registerNodeTracer = (config: AlertyConfig) => {
  if (!isNodeEnvironment()) {
    return;
  }

  if (config.debug) {
    console.info("Registering node trace provider");
  }

  process.on("uncaughtException", (error) => {
    captureError(error);
  });

  process.on("unhandledRejection", (reason: any) => {
    captureError(reason instanceof Error ? reason : new Error(reason));
  });

  return registerTraceProvider(TraceProviderKind.Node, config);
};
