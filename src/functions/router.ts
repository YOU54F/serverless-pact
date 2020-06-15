import koa from 'koa'
import http from 'koa-route'
import pino from "pino";
import axios, { AxiosError } from "axios";
import { spawnPactServerAndWait, PactServerResult } from "./utils/pact";

export const Router = new koa()


const handler = async (ctx: koa.Context) => {

  const dest = pino.destination({ sync: false });
  const logger = pino(dest).child({
    // ctx,
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
      // return ok(result.data);

      ctx.body = result.data

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

Router.use(http.get('*', handler))
