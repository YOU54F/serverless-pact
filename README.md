# serverless-pact

POC of using serverless alongside a pre-generated PACT contract file

- Accepts requests on any path via API gateway
- Spawns a pact-stub-server process and waits for it to start up
- Sends a canned request to the pact stub server
- Sends response from pact stub server, to client

## Instructions

To run:

```sh
yarn install
make local-pact-service
make local-lambda-curl
```