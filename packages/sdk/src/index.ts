import { Span, SpanStatusCode, trace } from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { Resource } from "@opentelemetry/resources";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import {
  SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";

interface AlertyServiceConfig {
  serviceName: string;
  serviceVersion: string;
  deploymentEnvironment: string;
}

interface AlertyConfig {
  endpoint: string;
}

var defaultAlertyConfig: AlertyConfig = {
  endpoint: "https://ingest.alerty.ai",
};

let alertyService: AlertyServiceConfig = {
  serviceName: "",
  serviceVersion: "",
  deploymentEnvironment: "",
};

function captureError(error: Error | string): void {
  const tracer = trace.getTracer("default");
  const span: Span = tracer.startSpan("error");

  if (typeof error === "string") {
    error = new Error(error);
  }

  span.recordException(error);
  span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
  span.end();
}

// Backend (Node.js) Error Handling
if (
  typeof process !== "undefined" &&
  process.release &&
  process.release.name === "node"
) {
  process.on("uncaughtException", (error) => {
    captureError(error);
  });

  process.on("unhandledRejection", (reason: any) => {
    captureError(reason instanceof Error ? reason : new Error(reason));
  });
}

// Frontend (Web) Error Handling
if (typeof window !== "undefined") {
  window.onerror = (message, source, lineno, colno, error) => {
    captureError(error || message.toString());
    return false; // Prevents the default browser error handling.
  };

  window.onunhandledrejection = (event) => {
    captureError(event.reason);
  };
}

const setupNodeTracer = (endpoint: string) => {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: alertyService.serviceName,
      [SEMRESATTRS_SERVICE_VERSION]: alertyService.serviceVersion,
      [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: alertyService.deploymentEnvironment,
    }),
  });

  const exporter = new OTLPTraceExporter({
    url: new URL("/v1/traces", endpoint).href,
    headers: {},
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  provider.register();

  registerInstrumentations({
    instrumentations: [],
  });

  return provider.getTracer("alerty-node-tracer");
};

const setupWebTracer = (endpoint: string) => {
  const provider = new WebTracerProvider({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: alertyService.serviceName,
      [SEMRESATTRS_SERVICE_VERSION]: alertyService.serviceVersion,
      [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: alertyService.deploymentEnvironment,
    }),
  });

  const exporter = new OTLPTraceExporter({
    url: new URL("/v1/traces", endpoint).href,
    headers: {},
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  provider.register();

  registerInstrumentations({
    instrumentations: [],
  });

  return provider.getTracer("alerty-web-tracer");
};

const init = (config: AlertyServiceConfig, endpoint?: string) => {
  alertyService = config;

  if (typeof window !== "undefined") {
    // Frontend environment (React, Next.js in client-side)
    return setupWebTracer(endpoint || defaultAlertyConfig.endpoint);
  } else if (
    typeof process !== "undefined" &&
    process.release &&
    process.release.name === "node"
  ) {
    // Backend environment (Node.js, Next.js in server-side)
    return setupNodeTracer(endpoint || defaultAlertyConfig.endpoint);
  } else {
    throw new Error("Unsupported environment for Alerty initialization");
  }
};

export { captureError, init };
