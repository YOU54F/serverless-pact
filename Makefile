
local-pact-service:
	yarn run start

up:
	docker-compose up -d

layer-pact:
	./local/scripts/build-pact.sh

local-bucket-populate:
	./local/scripts/putObjects.sh

local-lambda-curl:
	./local/scripts/curlLambda.sh