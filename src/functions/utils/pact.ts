import { spawn, ChildProcessByStdio } from "child_process";
const {
  chunksToLinesAsync,
} = require("@rauschma/stringio");
import pino from "pino";
import internal from "stream";

export interface PactServerResult {
  reader:boolean,
  childProcess:ChildProcessByStdio<null, internal.Readable, null>
}
export const spawnPactServerAndWait = async (logger: pino.Logger): Promise<PactServerResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      logger.info("Calling pact mock server");
      let args = ["pact-stub-service"];
      args.push(`--host`);
      args.push(`0.0.0.0`);
      args.push(`--port`);
      args.push(`9999`);
      args.push(`pact.json`);
      const childProcess = spawn("/bin/sh", ["-c", args.join(" ")], {
        stdio: ['ignore', 'pipe', process.stderr],
      }); // (A)
      const reader = await echoReadable(childProcess.stdout,logger); // (B)

      return resolve({
        reader,
        childProcess
      })
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
  let result
  for await (const line of chunksToLinesAsync(readable)) {
    if (line.includes("WEBrick::HTTPServer#start: pid=")){
      return result = true
    }
  }
  return result
}
