import pino from "pino";
import { spawnPactServerAndWait, PactServerResult } from "./utils/pact";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const app = express();
let pactMockRes: PactServerResult;
const dest = pino.destination({ sync: false });
const port = Math.floor(Math.random()*(9000-8000+1)+8000);
app.use("*", async (req, res, next) => {
  const logger = pino(dest).child({});
  pactMockRes = await spawnPactServerAndWait(port, logger);
  next("route");
});

app.use("*", createProxyMiddleware({
  target: `http://localhost:${port}`,
  onProxyRes() {
    pactMockRes.pactStubProcess? pactMockRes.pactStubProcess.kill(): null;
    dest.flushSync();
  },
  onError() {
    pactMockRes.pactStubProcess? pactMockRes.pactStubProcess.kill(): null;
    dest.flushSync();
  }
}));
