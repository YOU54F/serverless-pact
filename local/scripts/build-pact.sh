#! /usr/bin/env bash

docker build -f local/docker/pact.Dockerfile -t pact-builder .

mkdir -p layer

rm -rf layer/pact

container_id=$(docker create -ti pact-builder /bin/sh)
docker cp "$container_id:/opt/pact" ./layer/pact

cd layer/pact || exit
ln -s bin/pact pact
ln -s bin/pact-broker pact-broker
ln -s bin/pact-message pact-message
ln -s bin/pact-mock-service pact-mock-service
ln -s bin/pact-provider-verifier pact-provider-verifier
ln -s bin/pact-publish pact-publish
ln -s bin/pact-stub-service pact-stub-service

zip -9r pact-layer.zip ./bin ./lib pact*
mv pact-layer.zip ..