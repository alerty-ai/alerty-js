import { Instrumentation } from "@opentelemetry/instrumentation";
import { parseDsn } from "./utils";
import { registerTraces } from "./traces";
import { registerMetrics } from "./metrics";

interface AlertyServiceConfig {
  name?: string;
  version?: string;
  environment?: string;
}

export interface AlertyConfig {
  dsn: string;
  instrumentations?: (Instrumentation | Instrumentation[])[];
  debug?: boolean;
  service?: AlertyServiceConfig;
}

const registerInstrumentation = (config: AlertyConfig) => {
  try {
    registerTraces(config);
  } catch (error) {
    if (config.debug) {
      console.error(error);
    }
  }

  try {
    registerMetrics(config);
  } catch (error) {
    if (config.debug) {
      console.error(error);
    }
  }
};

export const configure = (config: AlertyConfig) => {
  try {
    if (!config.dsn) {
      throw Error("[ERR] No Alerty DSN provided, it will not be initialized.");
    }

    const { ingestHost, orgId, resourceId } = parseDsn(config.dsn);
    if (!ingestHost || !orgId || !resourceId) {
      throw Error(
        "[ERR] Invalid Alerty DSN provided, it will not be initialized.",
      );
    }

    registerInstrumentation(config);
  } catch (error) {
    if (config.debug) {
      console.error(error);
    }
  }
};
