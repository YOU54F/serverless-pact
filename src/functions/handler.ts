import { APIGatewayProxyPromiseHandler } from "..";
import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import pino from "pino";
import axios, { AxiosError } from "axios";
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
    if (pactMockRes.started) {
      logger.info(
        {
          pactProcess: pactMockRes.started,
          msg: "Pact stub service spawned and ready for request",
        },
        pactMockRes.pactProcessLog.join("")
      );
      const result = await axios
        .get("http://localhost:9999/v2/pet/1845563262948980200", {})
        .then();
      logger.info({ result: result.data }, "Pact Stub Service response");
      return ok(result.data);
    }
  } catch (error) {
    if (error && error.isAxiosError) {
      const axiosError = error as AxiosError;

      if (error.response) {
        logger.error(
          {
            error: axiosError.response.data,
            pactMockRes,
          },
          "Axios error occurred"
        );
        throw axiosError.response.data;
      }

      logger.error(
        {
          error: axiosError.message,
          pactMockRes,
        },
        "Axios error occurred"
      );
      throw axiosError.message;
    }

    if (!pactMockRes) {
      logger.error(
        {
          error,
          pactMockRes,
        },
        error
      );
      throw new Error(error);
    }
    const errorMessageGeneric = "Generic error occurred";

    logger.error(
      {
        error: error.toString(),
        pactMockRes,
      },
      errorMessageGeneric
    );
    throw new Error(error.toString());
  } finally {
    dest.flushSync();
  }
};

export const generate = middy(handler).use(doNotWaitForEmptyEventLoop());
