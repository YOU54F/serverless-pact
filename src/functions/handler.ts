import { APIGatewayProxyPromiseHandler } from "..";
import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import pino from "pino";
import axios from "axios";
import { ok, internalServerError } from "./utils/responses";
import { spawnPactServerAndWait, PactServerResult } from "./utils/pact";

export const handler: APIGatewayProxyPromiseHandler = async (
  event,
  context
) => {
  const dest = pino.destination({ sync: false });
  const { awsRequestId } = context;
  const logger = pino(dest).child({
    awsRequestId,
  });
  let pactMockRes: PactServerResult;
  try {
    pactMockRes = await spawnPactServerAndWait(logger);
    logger.info({ status: pactMockRes.reader }, "pact server be spawned");
    logger.info("making axios request");
    const result = await axios
      .get("http://localhost:9999/v2/pet/1845563262948980200", {})
      .then();
    logger.info({ result: result.data }, "data");
    return ok(result.data);
  } catch (error) {
    logger.error(
      { error, stream: pactMockRes.childProcess.stdout },
      "dun borked"
    );
    pactMockRes.childProcess.kill();

    return internalServerError();
  } finally {
    logger.info("ending gracefully");
    pactMockRes.childProcess.kill();
    dest.flushSync();
  }
};

export const generate = middy(handler).use(doNotWaitForEmptyEventLoop());
