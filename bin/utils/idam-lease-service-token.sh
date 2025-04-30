#!/usr/bin/env bash

set -ex

microservice=${1}
oneTimePassword=${2}

curl --insecure --fail --show-error --silent -X POST \
  http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/lease \
  -H "Content-Type: application/json" \
  -d '{
    "microservice": "'${microservice}'",
    "oneTimePassword": "'${oneTimePassword}'"
  }'
