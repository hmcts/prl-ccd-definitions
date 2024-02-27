#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

export CCD_UI_TESTS=true
if [ ${ENVIRONMENT} == preview ]; then
  yarn test:preview
else
  yarn test:master
fi