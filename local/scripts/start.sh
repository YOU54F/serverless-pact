#! /usr/bin/env bash
set -e

echo "Starting Healthcheck..."
nohup sh -c ./healthcheck &

echo "Starting Pact Service..."
pact-stub-service --log-level=INFO --host 0.0.0.0 --port 8080 /pact.json