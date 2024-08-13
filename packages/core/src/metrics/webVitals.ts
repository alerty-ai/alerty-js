import { isBrowserEnvironment } from "../utils";
import { AlertyConfig } from "../config";
import { AlertyMeterKind, registerMeterProvider } from "./utils";

export const registerWebVitals = async (config: AlertyConfig) => {
  if (!isBrowserEnvironment() || !window.performance) {
    return;
  }

  if (config.debug) {
    console.info("Registering Web Vitals metrics");
  }

  const { onCLS, onLCP, onFCP, onTTFB, onINP } = await import("web-vitals");

  const meter = registerMeterProvider(AlertyMeterKind.WebVitals, config);

  const clsMetric = meter.createGauge("web_vital_cls", {
    description: "Cumulative Layout Shift",
  });

  const lcpMetric = meter.createGauge("web_vital_lcp", {
    description: "Largest Contentful Paint",
    unit: "milliseconds",
  });

  const fcpMetric = meter.createGauge("web_vital_fcp", {
    description: "First Contentful Paint",
    unit: "milliseconds",
  });

  const ttfbMetric = meter.createGauge("web_vital_ttfb", {
    description: "Time to First Byte",
    unit: "milliseconds",
  });

  const inpMetric = meter.createGauge("web_vital_inp", {
    description: "Input Delay",
    unit: "milliseconds",
  });

  onCLS((metric) => {
    clsMetric.record(metric.value, { path: window.location.pathname });
    if (config.debug) {
      console.info(metric);
    }
  });
  onLCP((metric) => {
    lcpMetric.record(metric.value, { path: window.location.pathname });
    if (config.debug) {
      console.info(metric);
    }
  });
  onFCP((metric) => {
    fcpMetric.record(metric.value, { path: window.location.pathname });
    if (config.debug) {
      console.info(metric);
    }
  });
  onTTFB((metric) => {
    ttfbMetric.record(metric.value, { path: window.location.pathname });
    if (config.debug) {
      console.info(metric);
    }
  });
  onINP((metric) => {
    inpMetric.record(metric.value, { path: window.location.pathname });
    if (config.debug) {
      console.info(metric);
    }
  });
};
