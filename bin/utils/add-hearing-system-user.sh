#!/bin/bash
# This script is primarily intended for use in the CI/CD pipeline when creating a preview environment.

# It is used to add new hearing system user

set -exu

echo -e "Adding new hearing system user"

dir=$(dirname "${0}")

SERVICE_TOKEN="$("$dir/idam-lease-service-token.sh" prl_cos_api \
  "$(docker run --rm hmctspublic.azurecr.io/imported/toolbelt/oathtool --totp -b "${PRL_S2S_SECRET}")")"

ACCESS_TOKEN="$("$dir/idam-access-token.sh" "$SYSTEM_UPDATE_USER_USERNAME" "$SYSTEM_UPDATE_USER_PASSWORD")"

curl --silent --show-error --location "${ROLE_ASSIGNMENT_URL}/am/role-assignments" \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${ACCESS_TOKEN}" \
  --header "ServiceAuthorization: Bearer ${SERVICE_TOKEN}" \
  --data @- <<EOF
    {
      "roleRequest": {
        "id": "6455c84c-e77d-4c4f-9759-bf4a93a8e971",
        "clientId": "fis_hmc_api",
        "authenticatedUserId": null,
        "correlationId": null,
        "assignerId": "6455c84c-e77d-4c4f-9759-bf4a93a8e971",
        "requestType": null,
        "process": "private-law-system-users",
        "reference": "private-law-hearings-system-user",
        "replaceExisting": true,
        "roleAssignmentId": null,
        "status": null,
        "created": null,
        "log": null,
        "byPassOrgDroolRule": false
      },
      "requestedRoles": [
        {
          "id": null,
          "actorIdType": "IDAM",
          "actorId": "6455c84c-e77d-4c4f-9759-bf4a93a8e971",
          "roleType": "ORGANISATION",
          "roleName": "hearing-viewer",
          "classification": "PUBLIC",
          "grantType": "STANDARD",
          "roleCategory": "SYSTEM",
          "readOnly": false,
          "beginTime": "2026-01-19T13:58:00.946954Z",
          "endTime": null,
          "created": null,
          "authorisations": null,
          "attributes": {
            "caseType": "PRLAPPS",
            "substantive": "N",
            "jurisdiction": "PRIVATELAW"
          }
        },
        {
          "id": null,
          "actorIdType": "IDAM",
          "actorId": "6455c84c-e77d-4c4f-9759-bf4a93a8e971",
          "roleType": "ORGANISATION",
          "roleName": "hearing-manager",
          "classification": "PUBLIC",
          "grantType": "STANDARD",
          "roleCategory": "SYSTEM",
          "readOnly": false,
          "beginTime": "2026-01-19T13:58:00.946954Z",
          "endTime": null,
          "created": null,
          "authorisations": null,
          "attributes": {
            "caseType": "PRLAPPS",
            "substantive": "N",
            "jurisdiction": "PRIVATELAW"
          }
        }
      ]
    }
EOF
