import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { AlertyConfig } from "../config";
import {
  ALERTY_ORGANIZATION_HEADER,
  ALERTY_RESOURCE_HEADER,
  parseDsn,
} from "../utils";
import { makeResource } from "../resource";

export enum TraceProviderKind {
  Node = "node",
  Browser = "browser",
}

const makeTracerName = (providerKind: TraceProviderKind) => {
  return `alerty-${providerKind}-tracer`;
};

const makeTraceExporter = (config: AlertyConfig) => {
  const unpackedDsn = parseDsn(config.dsn);

  return new OTLPTraceExporter({
    url: new URL("/v1/traces", unpackedDsn.ingestHost).href,
    headers: {
      [ALERTY_ORGANIZATION_HEADER]: unpackedDsn.orgId,
      [ALERTY_RESOURCE_HEADER]: unpackedDsn.resourceId,
    },
  });
};

export const registerTraceProvider = (
  kind: TraceProviderKind,
  config: AlertyConfig,
) => {
  const providerFactory = {
    [TraceProviderKind.Node]: NodeTracerProvider,
    [TraceProviderKind.Browser]: WebTracerProvider,
  };

  const resource = makeResource(config);

  const provider = new providerFactory[kind]({
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
