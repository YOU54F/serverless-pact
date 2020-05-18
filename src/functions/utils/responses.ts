export const json = (statusCode: number, body: any) => ({
  statusCode,
  body: JSON.stringify(body)
});

export const empty = (statusCode: number) => ({ statusCode, body: "" });

// 2XX
export const ok = (body?: {}) => (body ? json(200, body) : empty(200));

// 4XX
export const badRequest = (errors?: string[]) =>
  errors ? json(400, { errors }) : empty(400);

export const forbidden = (message?: string) =>
  message ? json(403, { message }) : empty(403);

export const notFound = () => empty(404);

// 5XX
export const internalServerError = () => empty(500);
