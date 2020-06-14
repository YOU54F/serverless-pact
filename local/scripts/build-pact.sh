#! /usr/bin/env bash

docker build -f local/docker/pact.Dockerfile -t pact-builder .

mkdir -p layer

rm -rf layer/pact

container_id=$(docker create -ti pact-builder /bin/sh)
docker cp "$container_id:/opt/" ./layer/pact

cat > layer/pact/.slsignore << EOF
share/**
EOF

cd layer/pact || exit
ln -s pact/bin/pact pact
ln -s pact/bin/pact-broker pact-broker
ln -s pact/bin/pact-message pact-message
ln -s pact/bin/pact-mock-service pact-mock-service
ln -s pact/bin/pact-provider-verifier pact-provider-verifier
ln -s pact/bin/pact-publish pact-publish
ln -s pact/bin/pact-stub-service pact-stub-service

cd layer
zip -9r pact-layer.zip pact