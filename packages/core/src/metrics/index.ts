import { AlertyConfig } from "../config";
import { registerWebVitals } from "./webVitals";

export const registerMetrics = (config: AlertyConfig) => {
  registerWebVitals(config);
};
