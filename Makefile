
local-pact-service:
	yarn run start

up:
	docker-compose up -d

layer-pact:
	./local/scripts/build-pact.sh

layer-deploy:
	cd layer && serverless deploy

local-lambda-curl:
	./local/scripts/curlLambda.sh

download-pact:
	./local/scripts/download-pact.sh