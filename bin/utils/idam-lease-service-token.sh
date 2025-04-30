#!/usr/bin/env bash

set -eux

microservice=${1}
oneTimePassword=${2}

curl --insecure --fail --show-error --silent -X POST \
 http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease \
  -H "Content-Type: application/json" \
  -d '{
    "microservice": "prl_cos_api",
    "oneTimePassword": "'${oneTimePassword}'"
  }'
