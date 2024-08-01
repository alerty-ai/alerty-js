import { Resource, ResourceAttributes } from "@opentelemetry/resources";
import { AlertyConfig } from "./config";
import {
  SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";

export const makeResource = (
  config: AlertyConfig,
  additionalAttributes?: ResourceAttributes,
) => {
  return new Resource({
    [SEMRESATTRS_SERVICE_NAME]: config.service?.name,
    [SEMRESATTRS_SERVICE_VERSION]: config.service?.version,
    [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: config.service?.environment,
    ...additionalAttributes,
  });
};
