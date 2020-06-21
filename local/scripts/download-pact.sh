#! /usr/bin/env bash

cd /opt

export PACT_RUBY_VERSION="1.66.0" 

curl -L -O https://github.com/pact-foundation/pact-ruby-standalone/releases/download/v${PACT_RUBY_VERSION}/pact-${PACT_RUBY_VERSION}-linux-x86_64.tar.gz && \
    tar -xf pact-${PACT_RUBY_VERSION}-linux-x86_64.tar.gz && \
    rm pact-${PACT_RUBY_VERSION}-linux-x86_64.tar.gz && \
    rm -rf /var/lib/apt/lists/*

export PATH="/opt/pact/bin/:${PATH}"
