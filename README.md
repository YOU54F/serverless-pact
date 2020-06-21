# serverless-pact

A template project to allow the use of a pact stub service in combination with pre-generated PACT contract file, hosted inside a lambda function backed by API gateway.

- Accepts requests on any path via API gateway
- Spawns a pact-stub-server process and waits for it to start up
- Forwards any http request to the pact stub server
- Sends response from pact stub server, to client

## Pre-Req

For local running, pact-stub-service must be available on your command line.

you can download it here :-
[pact-ruby-standalone](https://github.com/pact-foundation/pact-ruby-standalone/releases)

Note:- Comment out the following to run locally in `serverless.yml`

```
    layers:
      - ${cf:pact-standalone-${self:provider.stage}.PactStandaloneLayerExport}
```

## Instructions to run locally

To run:

```sh
yarn install
make local-pact-service
make local-lambda-curl
```

## Instructions to run in aws

1. Add you required pact file, as `pact.json` in the base of the repository
2. Run `make layer-pact` to build the pact standalone layer
3. Run `make layer-deploy` to deploy the pact-standalone layer
4. Run `serverless deploy` to deploy the service

Note:- Dont forget to uncomment the `layers` section in the `serverless.yml` when performing step 4.
