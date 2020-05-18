FROM lambci/lambda:build-nodejs12.x

RUN yum groupinstall -y "Development Tools"

RUN yum update -y && yum install -y tar curl

ARG PACT_RUBY_VERSION="1.66.0"

WORKDIR /opt

RUN curl -L -O https://github.com/pact-foundation/pact-ruby-standalone/releases/download/v${PACT_RUBY_VERSION}/pact-${PACT_RUBY_VERSION}-linux-x86_64.tar.gz && \
    tar -xf pact-${PACT_RUBY_VERSION}-linux-x86_64.tar.gz && \
    rm pact-${PACT_RUBY_VERSION}-linux-x86_64.tar.gz && \
    rm -rf /var/lib/apt/lists/*

ENV PATH="/opt/pact/bin/:${PATH}"