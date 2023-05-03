const { spawn } = require('child_process');

const envs = require('./env.json');

const environment = process.argv[2];
const scriptToRun = process.argv[3];
// Capture optional arguments after the scriptToRun argument
const arg4MagicNumberFix = 4;
const optionalArgs = process.argv.slice(arg4MagicNumberFix).join(' ');

if (!environment || !scriptToRun) {
  throw new Error('Please provide the environment and the script to run as arguments.');
}

if (!envs.hasOwnProperty(environment)) {
  throw new Error(`Environment "${environment}" not found in the JSON file.`);
}

const cmd = `TARGET_ENV=${environment} CCD_DEF_COS_URL=${envs[environment].cosUrl} CCD_DEF_CCD_URL=${envs[environment].ccdUrl} CCD_DEF_AAC_URL=${envs[environment].aacUrl} yarn ${scriptToRun} ${optionalArgs}`;
const subprocess = spawn(cmd, { shell: true, stdio: 'inherit' });

subprocess.on('exit', code => {
  if (code !== 0) {
    throw new Error(`Subprocess exited with code ${code}`);
  }
});
