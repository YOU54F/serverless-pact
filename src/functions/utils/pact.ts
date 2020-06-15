import { spawn, ChildProcessByStdio, ChildProcessWithoutNullStreams } from "child_process";
const { chunksToLinesAsync } = require("@rauschma/stringio");
import pino from "pino";
import internal from "stream";

export interface PactServerResult {
  started: boolean;
  pactProcessLog: string[];
  pactStubProcess: ChildProcessWithoutNullStreams;
}
export const spawnPactServerAndWait = async (
  logger: pino.Logger
): Promise<PactServerResult> => {
  return new Promise(async (resolve, reject) => {
    let pactProcessLog: string[] = [];
    let errorMessage: string;
    try {
      logger.info("Calling pact mock server");
      let args = ["pact-stub-service"];
      args.push(`--host`);
      args.push(`0.0.0.0`);
      args.push(`--port`);
      args.push(`9999`);
      args.push(`pact.json`);
      logger.info(args)
      const pactStubProcess = spawn("/bin/sh", ["-c", args.join(" ")]);
      pactStubProcess.stderr.on("data", (data) => {
        errorMessage = data.toString();
      });
      const started = await echoReadable(
        pactStubProcess.stdout,
        pactProcessLog
      );
      if (!started) {
        return reject(`Pact Stub Service: ${errorMessage}`);
      } else {
        return resolve({
          started,
          pactProcessLog,
          pactStubProcess
        });
      }
    } catch (e) {
      throw new Error("An error occurred whilst calling the pact mock service")
    }
  });
};

async function echoReadable(
  readable: internal.Readable,
  pactProcessLog: string[]
) {
  let started = false;
  for await (const line of chunksToLinesAsync(readable)) {
    pactProcessLog.push(line);
    if (line.includes("WEBrick::HTTPServer#start: pid=")) {
      return (started = true);
    }
  }
  return started;
}
