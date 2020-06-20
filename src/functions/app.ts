
import pino from "pino";
import { spawnPactServerAndWait, PactServerResult } from "./utils/pact";
import express from "express";
import { createProxyMiddleware } from 'http-proxy-middleware';

export const app = express()
let pactMockRes: PactServerResult;
const dest = pino.destination({ sync: false });

app.use('*', async (req, res, next) => {
  const logger = pino(dest).child({})
  pactMockRes = await spawnPactServerAndWait(logger);
  next('route');
})

app.use('*', 
  createProxyMiddleware({ target: 'http://localhost:9999',onProxyRes() {
    pactMockRes.pactStubProcess.kill();
    dest.flushSync();
  } })
)