import { isBrowserEnvironment } from "../utils";
import { AlertyConfig } from "../config";
import { AlertyMeterKind, registerMeterProvider } from "./utils";

export const registerNetworkMetrics = (config: AlertyConfig) => {
  if (!isBrowserEnvironment() || !window.performance) {
    return;
  }

  if (config.debug) {
    console.info("Registering Network Request metrics");
  }

  const meter = registerMeterProvider(AlertyMeterKind.Network, config);

  const timeSpentMetric = meter.createGauge("network_request_time_spent", {
    description: "Time Spent on Request",
    unit: "milliseconds",
  });

  const sizeMetric = meter.createGauge("network_request_size", {
    description: "Size of Network Request",
    unit: "bytes",
  });

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (
        "initiatorType" in entry &&
        (entry.initiatorType === "xmlhttprequest" ||
          entry.initiatorType === "fetch")
      ) {
        const uri = entry.name;
        const timeSpent = entry.duration;
        const size: number =
          ("transferSize" in entry ? (entry.transferSize as number) : 0) ||
          ("encodedBodySize" in entry ? (entry.encodedBodySize as number) : 0);

        timeSpentMetric.record(timeSpent, { uri });
        sizeMetric.record(size, { uri });

        if (config.debug) {
          console.info({ uri, timeSpent, size });
        }
      }
    });
  });

  observer.observe({ type: "resource", buffered: true });
};
