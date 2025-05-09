#!/usr/bin/env bash
#something to update this file
set -eu

dir=$(dirname ${0})

jq -c '(.[])' config/preview-am-role-assignments.json | while read user; do
  email=$(jq -r '.email' <<< $user)
  idamId=$(jq -r '.id' <<< $user)
  password=${PREVIEW_AM_USER_PASSWORD}

  if [[ $email == *"ejudiciary"* ]]; then
    password=${PREVIEW_AM_JUDGE_PASSWORD}
  fi

  jq -c '(.roleAssignments[])' <<< $user | while read assignment; do
    roleName=$(jq -r '.roleName' <<< $assignment)
    roleCategory=$(jq -r '.roleCategory' <<< $assignment)
    classification=$(jq -r '.classification' <<< $assignment)
    grantType=$(jq -r '.grantType' <<< $assignment)
    readOnly=$(jq -r '.readOnly' <<< $assignment)
    attributes=$(jq -r '.attributes | tostring' <<< $assignment)

    authorisations=$(jq -r '.authorisations | tostring' <<< $assignment)

    echo "Creating '${roleName}' assignment for user ${email}"
    ${dir}/utils/organisational-role-assignment.sh $email $password $classification $roleName $attributes $roleCategory $authorisations $grantType
  done
  echo
done
