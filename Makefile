
local-pact-service:
	yarn run start

up:
	docker-compose up -d

layer-pact:
	./local/scripts/build-pact.sh

local-lambda-curl:
	./local/scripts/curlLambda.sh