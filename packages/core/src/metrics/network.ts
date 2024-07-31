import { isBrowserEnvironment } from "../utils";

const registerNetworkMetrics = () => {
  if (!isBrowserEnvironment() || !window.performance) {
    return;
  }
};
