import { spawn, ChildProcessByStdio } from "child_process";
const { chunksToLinesAsync } = require("@rauschma/stringio");
import pino from "pino";
import internal from "stream";

export interface PactServerResult {
  started: boolean;
  pactStubProcess: ChildProcessByStdio<null, internal.Readable, null>;
}
export const spawnPactServerAndWait = async (
  logger: pino.Logger
): Promise<PactServerResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      logger.info("Calling pact mock server");
      let args = ["pact-stub-service"];
      // let args = ["/opt/pact/bin/pact-stub-service"];
      args.push(`--host`);
      args.push(`0.0.0.0`);
      args.push(`--port`);
      args.push(`9999`);
      args.push(`pact.json`);
      const pactStubProcess = spawn("/bin/sh", ["-c", args.join(" ")], {
        stdio: ["ignore", "pipe", process.stderr],
      });
      const started = await echoReadable(pactStubProcess.stdout, logger); // (B)

      return resolve({
        started,
        pactStubProcess,
      });
    } catch (e) {
      logger.error(
        { e },
        "An error occurred whilst calling the pact mock service"
      );
      reject(e);
    }
  });
};

async function echoReadable(readable: internal.Readable, logger: pino.Logger) {
  let started;
  for await (const line of chunksToLinesAsync(readable)) {
    logger.info({ line });
    if (line.includes("WEBrick::HTTPServer#start: pid=")) {
      return (started = true);
    }
  }
  return started;
}
