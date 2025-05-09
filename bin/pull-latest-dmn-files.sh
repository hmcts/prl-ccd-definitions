#!/usr/bin/env bash

branchName=$1

#Checkout specific branch of prl-wa-task-configuration
git clone https://github.com/hmcts/prl-wa-task-configuration.git

if [ ! -d "./prl-wa-task-configuration" ]; then
  exit 1
fi

echo "Switch to ${branchName} branch on prl-wa-task-configuration"
cd prl-wa-task-configuration
git checkout ${branchName}
cd ..

#Copy dmn files to camunda folder
if [ ! -d "./camunda" ]; then
  mkdir camunda
fi

cp -r ./prl-wa-task-configuration/src/main/resources/*.dmn ./camunda
rm -rf ./prl-wa-task-configuration
