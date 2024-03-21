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
