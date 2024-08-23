import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";
import { AlertyConfig } from "../config";
import { makeResource } from "../resource";
import { isBrowserEnvironment } from "../utils";
import { captureError } from "./captureError";
import { makeTraceExporter, makeTracerName, TraceProviderKind } from "./utils";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  WebTracerProvider,
} from "@opentelemetry/sdk-trace-web";

const registerTraceProvider = (
  kind: TraceProviderKind,
  config: AlertyConfig,
) => {
  const resource = makeResource(config);

  const provider = new WebTracerProvider({
    resource,
  });

  const exporter = makeTraceExporter(config);

  if (config.debug) {
    provider.addSpanProcessor(
      new SimpleSpanProcessor(new ConsoleSpanExporter()),
    );
  }
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  provider.register();

  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      ...getWebAutoInstrumentations(
        {
          "@opentelemetry/instrumentation-user-interaction": {
            eventNames: ["click"],
          }
        }
      ),
      ...(config.instrumentations ?? [])
    ],
  });

  return provider.getTracer(makeTracerName(kind));
};

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
