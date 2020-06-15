import {
  spawn,
  ChildProcessByStdio,
  ChildProcessWithoutNullStreams,
} from "child_process";
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
      args.push(`--log-level`);
      args.push(`DEBUG`);
      args.push(`--host`);
      args.push(`0.0.0.0`);
      args.push(`--port`);
      args.push(`9999`);
      args.push(`pact.json`);

//       Usage:
//   pact-stub-service PACT_URI ...

// Options:
//   -p, [--port=PORT]                        # Port on which to run the service
//   -h, [--host=HOST]                        # Host on which to bind the service
//                                            # Default: localhost
//   -l, [--log=LOG]                          # File to which to log output
//   -n, [--broker-username=BROKER_USERNAME]  # Pact Broker basic auth username
//   -p, [--broker-password=BROKER_PASSWORD]  # Pact Broker basic auth password
//   -k, [--broker-token=BROKER_TOKEN]        # Pact Broker bearer token (can also be set using the PACT_BROKER_TOKEN environment variable)
//       [--log-level=LOG_LEVEL]              # Log level. Options are DEBUG INFO WARN ERROR
//                                            # Default: DEBUG
//   -o, [--cors=CORS]                        # Support browser security in tests by responding to OPTIONS requests and adding CORS headers to mocked responses
//       [--ssl], [--no-ssl]                  # Use a self-signed SSL cert to run the service over HTTPS
//       [--sslcert=SSLCERT]                  # Specify the path to the SSL cert to use when running the service over HTTPS
//       [--sslkey=SSLKEY]                    # Specify the path to the SSL key to use when running the service over HTTPS

// Description:
//   Start a stub service with the given pact file(s) or directories. Pact URIs may be local file or directory paths, or HTTP.
//   Include any basic auth details in the URL using the format https://USERNAME:PASSWORD@URI. Where multiple matching
//   interactions are found, the interactions will be sorted by response status, and the first one will be returned. This
//   may lead to some non-deterministic behaviour. If you are having problems with this, please raise it on the pact-dev
//   google group, and we can discuss some potential enhancements. Note that only versions 1 and 2 of the pact
//   specification are currently fully supported. Pacts using the v3 format may be used, however, any matching features
//   added in v3 will currently be ignored.
      const pactStubProcess = spawn("/bin/sh", ["-c", args.join(" ")]);
      pactStubProcess.stderr.on("data", (data) => {
        errorMessage = data.toString();
      });
      pactStubProcess.stdout.on("data", (data) => {
        pactProcessLog.push(data);
      });
      const started = await echoReadable(
        pactStubProcess.stdout
      );
      if (!started) {
        return reject(`Pact Stub Service: ${errorMessage}`);
      } else {
        return resolve({
          started,
          pactProcessLog,
          pactStubProcess,
        });
      }
    } catch (e) {
      throw new Error("An error occurred whilst calling the pact mock service");
    }
  });
};

async function echoReadable(
  readable: internal.Readable,
  // pactProcessLog: string[]
) {
  let started = false;
  for await (const line of chunksToLinesAsync(readable)) {
    // pactProcessLog.push(line);
    if (line.includes("WEBrick::HTTPServer#start: pid=")) {
      return (started = true);
    }
  }
  return started;
}
