import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { AlertyConfig } from "../config";
import { makeResource } from "../resource";
import { isNodeEnvironment } from "../utils";
import { captureError } from "./captureError";
import { makeTraceExporter, makeTracerName, TraceProviderKind } from "./utils";
import { registerInstrumentations } from "@opentelemetry/instrumentation";

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

const registerTraceProvider = (
  kind: TraceProviderKind,
  config: AlertyConfig,
) => {
  const resource = makeResource(config);

  const provider = new NodeTracerProvider({
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
    instrumentations: config.instrumentations,
  });

  return provider.getTracer(makeTracerName(kind));
};
