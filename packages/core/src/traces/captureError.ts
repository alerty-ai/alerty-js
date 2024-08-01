import { Span, SpanStatusCode, trace } from "@opentelemetry/api";

export const captureError = (error: Error | string): void => {
  const tracer = trace.getTracer("default");
  const span: Span = tracer.startSpan("error");

  if (typeof error === "string") {
    error = new Error(error);
  }

  span.recordException(error);
  span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
  span.end();
};
