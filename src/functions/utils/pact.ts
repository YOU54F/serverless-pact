import {
  spawn,
  ChildProcessWithoutNullStreams,
} from "child_process";
import pino from "pino";

export interface PactServerResult {
  started: boolean;
  pactStubProcess: ChildProcessWithoutNullStreams;
}
export const spawnPactServerAndWait = async (
  port:number,
  logger: pino.Logger
): Promise<PactServerResult> => {
  return new Promise(async (resolve, reject) => {
    let errorMessage: string;
    try {
      logger.info("Calling pact mock server");
      let args = ["pact-stub-service"];
      args.push(`--log-level`);
      args.push(`DEBUG`);
      args.push(`--host`);
      args.push(`0.0.0.0`);
      args.push(`--port`);
      args.push(`${port}`);
      args.push(`pact.json`);

      const pactStubProcess = spawn("/bin/sh", ["-c", args.join(" ")]);
      pactStubProcess.stderr.on("data", (data) => {
        logger.error(data.toString());
        errorMessage = data.toString();
      });
      pactStubProcess.stdout.on("data", (data) => {
        logger.info(data.toString());
      });

      const pause = async (duration: number) =>
        new Promise((r) => setTimeout(r, duration));
      await pause(1000);
      if (!pactStubProcess.pid || pactStubProcess.exitCode && pactStubProcess.exitCode !== 0) {
        if (errorMessage.includes('EADDRINUSE')){
          return resolve({
            started: true,
            pactStubProcess,
          });
        }
        return reject(`Pact Stub Service: ${errorMessage}`);
      } else {
        const started = true;
        return resolve({
          started,
          pactStubProcess,
        });
      }
    } catch (e) {
      throw new Error("An error occurred whilst calling the pact mock service");
    }
  });
};