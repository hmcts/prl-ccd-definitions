#!/usr/bin/env bash

set -eux

microservice=${1}
oneTimePassword=${2}

echo "microservice is '${microservice}'"

curl --insecure --fail --show-error --silent -X POST \
  ${SERVICE_AUTH_PROVIDER_API_BASE_URL:-http://localhost:4502}/testing-support/lease \
  -H "Content-Type: application/json" \
  -d '{
    "microservice": "prl_cos_api",
    "oneTimePassword": "'${oneTimePassword}'"
  }'
