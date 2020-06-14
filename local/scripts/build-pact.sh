#! /usr/bin/env bash

docker build -f local/docker/pact.Dockerfile -t pact-builder .

mkdir -p layer

rm -rf layer/pact

container_id=$(docker create -ti pact-builder /bin/sh)
docker cp "$container_id:/opt/pact" ./layer/pact

# Required lib for AWS Lambda runtime
# We are renaming this file as lambda looks for libcrypt.so.1 but its a symlink to libcrypt-2.26.so
docker cp "$container_id:/usr/lib64/libcrypt-2.26.so" ./layer/pact/lib/libcrypt.so.1

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