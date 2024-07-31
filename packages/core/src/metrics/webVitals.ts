import { isBrowserEnvironment } from "../utils";
import { AlertyConfig } from "../config";
import { AlertyMeterKind, registerMeterProvider } from "./utils";

export const registerWebVitals = async (config: AlertyConfig) => {
  if (!isBrowserEnvironment() || !window.performance) {
    return;
  }

  const { onCLS, onLCP, onFCP, onTTFB } = await import("web-vitals");

  const meter = registerMeterProvider(AlertyMeterKind.WebVitals, config);

  const clsMetric = meter.createObservableGauge("web_vital_cls", {
    description: "Cumulative Layout Shift",
  });
  const lcpMetric = meter.createObservableGauge("web_vital_lcp", {
    description: "Largest Contentful Paint",
  });
  const fcpMetric = meter.createObservableGauge("web_vital_fcp", {
    description: "First Contentful Paint",
  });
  const ttfbMetric = meter.createObservableGauge("web_vital_ttfb", {
    description: "Time to First Byte",
  });

  clsMetric.addCallback((observableResult) => {
    onCLS((metric) => {
      observableResult.observe(metric.value);
    });
  });

  lcpMetric.addCallback((observableResult) => {
    onLCP((metric) => {
      observableResult.observe(metric.value);
    });
  });

  fcpMetric.addCallback((observableResult) => {
    onFCP((metric) => {
      observableResult.observe(metric.value);
    });
  });

  ttfbMetric.addCallback((observableResult) => {
    onTTFB((metric) => {
      observableResult.observe(metric.value);
    });
  });
};
