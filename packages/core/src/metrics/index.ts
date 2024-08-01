import { AlertyConfig } from "../config";
import { registerNetworkMetrics } from "./network";
import { registerWebVitals } from "./webVitals";

export const registerMetrics = (config: AlertyConfig) => {
  registerNetworkMetrics(config);
  registerWebVitals(config);
};
