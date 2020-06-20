
// import { PromiseHandler } from "..";
import pino from "pino";
import axios, { AxiosError } from "axios";
import { spawnPactServerAndWait, PactServerResult } from "./utils/pact";
import express from "express";
import proxy from "express-http-proxy";
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
// pactMockRes = await spawnPactServerAndWait(logger);

export const app = express()
// app.use('*', async (req, res, next) => {
//   const dest = pino.destination({ sync: false });
//   const logger = pino(dest).child({})
//   let pactMockRes: PactServerResult;
//   pactMockRes = await spawnPactServerAndWait(logger);
//   createProxyMiddleware({ target: 'http://localhost:9999' });
// })

app.use('*', async (req, res, next) => {
  const dest = pino.destination({ sync: false });
  const logger = pino(dest).child({})
  let pactMockRes: PactServerResult;
  pactMockRes = await spawnPactServerAndWait(logger);
  next('route');

  // createProxyMiddleware({ target: 'http://localhost:9999' });
})

app.use('*',   createProxyMiddleware({ target: 'http://localhost:9999' }))

//     const dest = pino.destination({ sync: false });
//   const logger = pino(dest).child({
//   });
//   let pactMockRes: PactServerResult;
//   try {
//     pactMockRes = await spawnPactServerAndWait(logger);
//     if (pactMockRes.started) {
//       logger.info(
//         {
//           pactProcess: pactMockRes.started
//         },
//         "Pact stub service spawned and ready for request",
//       );
//       return createProxyMiddleware({ target: 'http://localhost:9999' });

//       // console.log(result)
//       // return result
//       // const result = await axios
//       // .get(`http://localhost:9999${event.path}`, {})
//       // .then();


//       // logger.info({ result: result.data }, "Pact Stub Service Response");
  
//       // return {
//       //   body: JSON.stringify(result.data)
//       // }
//     } else {
//       throw new Error('Pact mock service is not started')
//     }
//   } catch (error) {
//     if (error && error.isAxiosError) {
//       const axiosError = error as AxiosError;
  
//       if (error.response) {
//         logger.error(
//           {
//             error: axiosError.response.data,
//           },
//           "Axios error occurred"
//         );
//         throw axiosError.response.data;
//       }
  
//       logger.error(
//         {
//           error: axiosError.message,
//         },
//         "Axios error occurred"
//       );
//       throw axiosError.message;
//     }
  
//     if (!pactMockRes) {
//       logger.error(
//         {
//           error,
//           pactMockRes,
//         },
//         error
//       );
//       throw new Error(error);
//     }
//     const errorMessageGeneric = "Generic error occurred";
  
//     logger.error(
//       {
//         error: error.toString(),
//       },
//       errorMessageGeneric
//     );
//     throw new Error(error.toString());
//   } finally {
//     pactMockRes.pactStubProcess.kill();
//     dest.flushSync();
//   }


// });


