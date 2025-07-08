# prl-ccd-definitions

Project creating Family Private Law (PRL) CCD config files...

Updated with Release 4.0 and Solicitor upload journey
## Usage

Clone project and in the project directory run: 
 - `yarn install && yarn reset-ccd-submodule`

Check `package.json` for a list of `yarn` scripts for XLS file generation and project management. Eg. AAT XLS file can
be generated with `yarn generate-excel-aat`

#### Troubleshooting

### Managing Preview environment PODs
Make sure you have added the label 'enable_keep_helm' while creating the PR. Otherwise, add the label and re-trigger the build.

### Error: Cannot find modules


When trying to create a XLS file ends with error message mentioning a module cannot be found

<details>
  <summary>Example error output</summary>

```sh
yarn run v1.22.5
$ TARGET_ENV=aat CCD_DEF_COS_URL=$npm_package_config_aat_cosUrl CCD_DEF_CCD_URL=$npm_package_config_aat_ccdUrl yarn run generate-excel -e *-prod.json
$ yarn --cwd ccd-definition-processor json2xlsx -D ../definitions/private-law/json -o ../definitions/private-law/xlsx/ccd-config-PRL-${TARGET_ENV:-base}.xlsx -e '*-prod.json'
$ node ./bin/json2xlsx -D ../definitions/private-law/json -o ../definitions/private-law/xlsx/ccd-config-PRL-aat.xlsx -e '*-prod.json'
node:internal/modules/cjs/loader:927
  throw err;
  ^

Error: Cannot find module 'matcher'
Require stack:
- [...]/prl-ccd-definitions/ccd-definition-processor/src/main/lib/file-utils.js
- [...]/prl-ccd-definitions/ccd-definition-processor/src/main/json2xlsx.js
- [...]/prl-ccd-definitions/ccd-definition-processor/bin/json2xlsx.js
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:924:15)
    at Function.Module._load (node:internal/modules/cjs/loader:769:27)
    at Module.require (node:internal/modules/cjs/loader:996:19)
    at require (node:internal/modules/cjs/helpers:92:18)
    at Object.<anonymous> ([...]/prl-ccd-definitions/ccd-definition-processor/src/main/lib/file-utils.js:4:17)
    at Module._compile (node:internal/modules/cjs/loader:1092:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1121:10)
    at Module.load (node:internal/modules/cjs/loader:972:32)
    at Function.Module._load (node:internal/modules/cjs/loader:813:14)
    at Module.require (node:internal/modules/cjs/loader:996:19) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '[...]/prl-ccd-definitions/ccd-definition-processor/src/main/lib/file-utils.js',
    '[...]/prl-ccd-definitions/ccd-definition-processor/src/main/json2xlsx.js',
    '[...]/prl-ccd-definitions/ccd-definition-processor/bin/json2xlsx.js'
  ]
}
```

</details>

try to reset definition processor submodule with `yarn reset-ccd-submodule`. Prerequisite: `yarn install` had been run before. 

## Running E2E against remote environment
```$bash
 SHOW_BROWSER_WINDOW=true PARALLEL_CHUNKS=5 yarn test
```
## Changes after yarn upgrade

After the yarn upgrade you need to follow the below steps to ensure that yarn commands are working fine in local:
1. Ensure that branch is synched with master
2. Run _yarn install_ in local
3. Run _yarn reset-ccd-submodule_ in local
4. Now you can run the yarn commands locally.
5. Also the file to update the environment urls is now env.json (env.json is read by json-env.js)

## Testing with prl-cos

### If your ticket doesn’t require changes in the prl-cos API

1. No changes are needed in this repository, and everything will be set automatically.

### If your ticket includes changes in the prl-cos API

1. Update the following section in the [values.preview.template.yaml](charts/prl-ccd-definitions/values.preview.template.yaml) file:
    ```yaml
    prl-cos:
      java:
        image: hmctspublic.azurecr.io/prl/cos:pr-3036 # Replace 3036 with the PR number of the prl-cos update you want to test against this repo.
    ```
2. If you make additional changes to the cos pr, the easiest way to reflect them in this repo is to delete the cos pod of this PR so it pulls the latest image from the PR:
    ```bash
    kubectl delete pod -n private-law prl-ccd-definitions-pr-2600-java-64b88bc8f4-ffn2v 
    ```
3. After testing, make sure to revert the above change to use the latest prl-cos image:
    ```yaml
    prl-cos:
      java:
        image: hmctspublic.azurecr.io/prl/cos:latest
    ```

### Functional End-to-End (E2E) Tests

Functional end-to-end (E2E) tests are hosted in the [prl-e2e-tests](https://github.com/hmcts/prl-e2e-tests) repository.

To run E2E tests on your PR build, add the label `enable-prl-e2e-tests`. This will initiate a Playwright smoke test. Developers should add this label when their changes are ready for code review.

Smoke tests from this repository are executed by triggering a build job in Jenkins.

The smoke test is run against **AAT** in the master build.

### Preview Database changes
Preview is now set up with a PostgreSQL flexible server. The database host is `private-law-preview.postgres.database.azure.com`. 
While the databases are listed in [values.preview.template.yaml](charts/prl-ccd-definitions/values.preview.template.yaml) under `postgresql` section. 
The password is present in aat key value under the secret `preview-db-password`   

### WA preview set up
On the pull request set label `pr-values:wa`

To test DMN changes update the branch name in [Jenkinsfile_CNP](Jenkinsfile_CNP) file (`def dmnBranch = "<branch_name>"`). 
**Note**: Before merging, revert it to the master branch (`def dmnBranch = "master"`)

### AM role assignment
To add new AAT user to preview update [preview-am-role-assignments.json](config/preview-am-role-assignments.json).

### PREVIEW HEARING BYPASS 
This is to speed up development by not relying on environments where hearing is integrated. 
So, on preview by default hearing api calls are bypassed. 
This controlled by env variable HEARING_PREVIEW_BYPASS_ENABLED [values.preview.template.yaml](charts/prl-ccd-definitions/values.preview.template.yaml).
Endpoint to post a hearing request is available on swagger ("swagger-ui/index.html#/hearing-support-controller") with no authorisation required 
put request ("/hearing-support/testing/prepare-for-hearing")
Sample payload for the swagger request - [sampleListedHearing.json](test/resource/hearing/sampleListedHearing.json). 
Replace :
"caseRef" : "<Actual case id>" (Add actual case id)
"hearingId" : "999999" (valid values are 999999 and 111111)