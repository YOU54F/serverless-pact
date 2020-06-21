import pino from "pino";

const noOutputLevel = 'silent';

interface MockLoggerOptions {
  output?: true;
}

export const getMockLogger = (options?: MockLoggerOptions) =>
  pino({
    name: "compass-pdf-form-mock-logger",
    level: options && options.output ? 'debug' : noOutputLevel
  });


