import { Span, SpanStatusCode, trace } from "@opentelemetry/api";
import { getDebugId } from "../utils";

export const captureError = (error: any): void => {
  const tracer = trace.getTracer("default");
  const span: Span = tracer.startSpan("error");

  if (typeof error === "string") {
    error = new Error(error);
  }

  const debugId = getDebugId(error);

  if (error instanceof Error) {
    if (debugId) {
      span.setAttribute("debugId", debugId);
    }

    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
    span.end();
  }
};
