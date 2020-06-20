import koa from "koa";
import pino from "pino";
import axios, { AxiosError } from "axios";
import { spawnPactServerAndWait, PactServerResult } from "./utils/pact";

export const Router = new koa();

Router.use(async (ctx) => {
  
  const dest = pino.destination({ sync: false });
  const logger = pino(dest).child({
  });
  let pactMockRes: PactServerResult;
  try {
    pactMockRes = await spawnPactServerAndWait(logger);
    if (pactMockRes.started) {
      logger.info(
        {
          ctxReq: ctx.request,
          ctxRes: ctx.response,
          pactProcess: pactMockRes.started
        },
        "Pact stub service spawned and ready for request",
      );

      const result = await axios
      .get(`http://localhost:9999${ctx.request.url}`, {})
      .then();


      logger.info({ result: result.data }, "Pact Stub Service Response");
  
      ctx.body = result.data
    } else {
      throw new Error('Pact mock service is not started')
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
    pactMockRes.pactStubProcess.kill();
    dest.flushSync();
  }

});



