# serverless-pact

POC of using serverless alongside a pre-generated PACT contract file

- Accepts requests on any path via API gateway
- Spawns a pact-stub-server process and waits for it to start up
- Forwards any GET request to the pact stub server
- Sends response from pact stub server, to client

## Pre-Req

For local running, pact-stub-service must be available on your command line. (TODO - use the local version rather than requiring the user to install? - would we need to check platform)
Note:- Comment out the following to run locally.  (TODO - stop this erroring depedant on stage)

```
    layers:
      - ${cf:pact-standalone-${self:provider.stage}.PactStandaloneLayerExport}
```


## Instructions

To run:

```sh
yarn install
make local-pact-service
make local-lambda-curl
```

