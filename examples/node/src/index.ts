import "./pre-start"; // Must be the first import
import logger from "jet-logger";

import EnvVars from "@src/common/EnvVars";
import server from "./server";

import * as Alerty from "@alerty/node";

Alerty.configure({
  dsn: "__DSN__",
});

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
