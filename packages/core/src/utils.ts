export interface AlertyDsn {
  orgId: string;
  ingestHost: string;
  resourceId: string;
}

export const ALERTY_ORGANIZATION_HEADER = "X-Alerty-OrganizationId";
export const ALERTY_RESOURCE_HEADER = "X-Alerty-ResourceId";

export const parseDsn = (dsn: string): AlertyDsn => {
  const dsnPattern = /^(https:\/\/)([^@]+)@([^/]+)\/([^/]+)$/;
  const match = dsn.match(dsnPattern);

  if (!match) {
    throw new Error("Invalid DSN format");
  }

  const orgId = match[2];
  const ingestHost = `https://${match[3]}`;
  const resourceId = match[4];

  const formattedOrgId = `org_${orgId?.toUpperCase()}`;

  return {
    orgId: formattedOrgId,
    ingestHost,
    resourceId: resourceId || "",
  };
};

export const isBrowserEnvironment = () => {
  return typeof window !== "undefined";
};

export const isNodeEnvironment = () => {
  return (
    typeof process !== "undefined" &&
    process.release &&
    process.release.name === "node"
  );
};

export const getDebugId = (err: Error): string | undefined => {
  if (isBrowserEnvironment()) {
    const alertyDebugIds = (window as any)._alertyDebugIds;
    return alertyDebugIds ? alertyDebugIds[err.stack ?? ""] : "";
  }

  if (typeof global !== "undefined") {
    const alertyDebugIds = (global as any)._alertyDebugIds;
    return alertyDebugIds ? alertyDebugIds[err.stack ?? ""] : "";
  }

  return undefined;
};
