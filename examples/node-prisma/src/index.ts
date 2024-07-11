import "./pre-start"; // Must be the first import
import logger from "jet-logger";

import EnvVars from "@src/common/EnvVars";
import server from "./server";

import * as Alerty from "@alerty/node";
import { PrismaInstrumentation } from "@prisma/instrumentation";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

Alerty.configure({
  dsn: "__YOUR_DSN__",
  instrumentations: [new PrismaInstrumentation()],
});

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "error"
    }
  ]
});

prisma.$on("error", (e: Prisma.LogEvent) => {
  Alerty.captureError(
    new PrismaClientUnknownRequestError(e.message, {
      clientVersion: Prisma.prismaVersion.client,
    }),
  );
});

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
