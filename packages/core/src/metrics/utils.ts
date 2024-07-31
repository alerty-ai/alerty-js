import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";
import { AlertyConfig } from "../config";
import { makeResource } from "../resource";
import {
  ALERTY_ORGANIZATION_HEADER,
  ALERTY_RESOURCE_HEADER,
  parseDsn,
} from "../utils";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";

export enum AlertyMeterKind {
  WebVitals = "web-vitals",
  Network = "network",
}

const makeMetricExporter = (config: AlertyConfig) => {
  const unpackedDsn = parseDsn(config.dsn);

  return new OTLPMetricExporter({
    url: new URL("/v1/metrics", unpackedDsn.ingestHost).href,
    headers: {
      [ALERTY_ORGANIZATION_HEADER]: unpackedDsn.orgId,
      [ALERTY_RESOURCE_HEADER]: unpackedDsn.resourceId,
    },
  });
};

const makeMeterName = (kind: AlertyMeterKind) => {
  return `alerty-${kind}-meter`;
};

export const registerMeterProvider = (
  kind: AlertyMeterKind,
  config: AlertyConfig,
) => {
  const resource = makeResource(config);
  const metricExporter = makeMetricExporter(config);

  const meterProvider = new MeterProvider({
    resource: resource,
    readers: [
      new PeriodicExportingMetricReader({
        exporter: metricExporter,
        exportIntervalMillis: 1_000,
      }),
    ],
  });

  return meterProvider.getMeter(makeMeterName(kind));
};
