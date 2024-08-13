import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { AlertyConfig } from "../config";
import {
  ALERTY_ORGANIZATION_HEADER,
  ALERTY_RESOURCE_HEADER,
  parseDsn,
} from "../utils";

export enum TraceProviderKind {
  Node = "node",
  Browser = "browser",
}

export const makeTracerName = (providerKind: TraceProviderKind) => {
  return `alerty-${providerKind}-tracer`;
};

export const makeTraceExporter = (config: AlertyConfig) => {
  const unpackedDsn = parseDsn(config.dsn);

  return new OTLPTraceExporter({
    url: new URL("/v1/traces", unpackedDsn.ingestHost).href,
    headers: {
      [ALERTY_ORGANIZATION_HEADER]: unpackedDsn.orgId,
      [ALERTY_RESOURCE_HEADER]: unpackedDsn.resourceId,
    },
  });
};
