#!/bin/bash

roleAssignmentsUrl="${IDAM_API_BASE_URL}/am/role-assignments"

curl --silent --location "$roleAssignmentsUrl" \
  --request POST \
  --header "Content-Type: application/json" \
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
                "classification": "RESTRICTED",
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
