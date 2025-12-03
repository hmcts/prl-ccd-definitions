#!/bin/bash

set -eu

echo "Adding 'case-allocator' role assignment to System User..."

dir=$(dirname ${0})

SERVICE_TOKEN=$($dir/idam-lease-service-token.sh prl_cos_api \
  $(docker run --rm hmctspublic.azurecr.io/imported/toolbelt/oathtool --totp -b ${PRL_S2S_SECRET:-AAAAAAAAAAAAAAAC}))

ACCESS_TOKEN=$($dir/idam-access-token.sh "$SYSTEM_UPDATE_USER_USERNAME" "$SYSTEM_UPDATE_USER_PASSWORD")

echo "Role Assignment URL: ${ROLE_ASSIGNMENT_URL}/am/role-assignments"

status=$(curl --silent --show-error --location --write-out "%{http_code}" "${ROLE_ASSIGNMENT_URL}/am/role-assignments" \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${ACCESS_TOKEN}" \
  --header "ServiceAuthorization: Bearer ${SERVICE_TOKEN}" \
  --data @- <<EOF
    {
        "roleRequest": {
            "id": "540b6fed-6454-4ea2-bf23-06ab4b113e2f",
            "clientId": "prl_cos_api",
            "authenticatedUserId": null,
            "correlationId": null,
            "assignerId": "540b6fed-6454-4ea2-bf23-06ab4b113e2f",
            "requestType": null,
            "process": "private-law-system-users",
            "reference": "private-law-case-allocator-system-user",
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
                "actorId": "540b6fed-6454-4ea2-bf23-06ab4b113e2f",
                "roleType": "ORGANISATION",
                "roleName": "case-allocator",
                "classification": "PUBLIC",
                "grantType": "STANDARD",
                "roleCategory": "SYSTEM",
                "readOnly": false,
                "beginTime": "2025-12-01T13:58:00.946954Z",
                "endTime": null,
                "created": null,
                "authorisations": null,
                "attributes": {
                    "jurisdiction": "PRIVATELAW",
                    "caseType": "PRLAPPS"
                }
            }
        ]
    }
EOF
)
echo "HTTP Status: $status"