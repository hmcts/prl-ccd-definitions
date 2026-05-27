#!/usr/bin/env bash
set -eu
## Usage: ./organisational-role-assignment.sh [username] [password] [role_classification] [role_name] [role_attributes] [microservice_name]
##
## Options:
##    - username: Email for user. Required.
##    - password: Password for user. Required.
##    - role_classification: Role assignment classification. Default to `PUBLIC`.
##    - role_name: Name of the role for role-assignment. Default to `ctsc`.
##

USERNAME=${1:?username argument is required}
PASSWORD=${2:?password argument is required}
ROLE_CLASSIFICATION="${3:-PUBLIC}"
ROLE_NAME="${4:-"ctsc"}"
ROLE_ATTRIBUTES="${5:-'{"jurisdiction":"PRIVATELAW"}'}"
ROLE_CATEGORY="${6:-"ADMIN"}"
AUTHORISATIONS="${7:-null}"
GRANT_TYPE="${8:-"STANDARD"}"
USER_ID="${9:-null}"

BASEDIR=$(dirname "$0")

USER_TOKEN=$($BASEDIR/idam-access-token.sh $USERNAME $PASSWORD)
#USER_ID=$($BASEDIR/idam-user-id.sh $USER_TOKEN)
SERVICE_TOKEN=$($BASEDIR/idam-lease-service-token.sh prl_cos_api \
  $(docker run --rm hmctsprod.azurecr.io/imported/toolbelt/oathtool --totp -b ${PRL_S2S_SECRET:?PRL_S2S_SECRET must be set}))

echo -e "\nCreating role assignment: \n User: ${USER_ID}\n Role name: ${ROLE_NAME}\n ROLE_CLASSIFICATION: ${ROLE_CLASSIFICATION}\n"

curl --silent --show-error -X POST "${ROLE_ASSIGNMENT_URL}/am/role-assignments" \
  -H "accept: application/vnd.uk.gov.hmcts.role-assignment-service.create-assignments+json;charset=UTF-8;version=1.0" \
  -H "Authorization: Bearer ${USER_TOKEN}" \
  -H "ServiceAuthorization: Bearer ${SERVICE_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{ "roleRequest": {
          "assignerId": "'"${USER_ID}"'",
          "process": "staff-organisational-role-mapping",
          "reference": "'"${USER_ID}/${ROLE_NAME}"'",
          "replaceExisting": true,
          "byPassOrgDroolRule": true
        },
        "requestedRoles": [
          {
            "actorIdType": "IDAM",
            "actorId": "'"${USER_ID}"'",
            "roleType": "ORGANISATION",
            "roleName": "'"${ROLE_NAME}"'",
            "classification": "'"${ROLE_CLASSIFICATION}"'",
            "grantType": "'"${GRANT_TYPE}"'",
            "roleCategory": "'"${ROLE_CATEGORY}"'",
            "readOnly": false,
            "attributes": '${ROLE_ATTRIBUTES}',
            "authorisations": '${AUTHORISATIONS}'
          }
        ]
      }'
