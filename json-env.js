const { spawn } = require('child_process');
const envs = require('./env.json');

const [,, environment, scriptToRun, ...optionalArgs] = process.argv;

if (!environment || !scriptToRun) {
  throw new Error('Usage: node script.js <environment> <script> [args...]');
}

let envConfig = envs[environment] || {};

if (!envConfig.cosUrl && envs.environments.includes(environment)) {
  envConfig = Object.fromEntries(
    Object.entries(envs.baseUrls).map(([key, url]) => [key, url.replace(/{{env}}/g, environment)])
  );
}

// Override with environment variables for preview
if (environment === 'preview' && process.env.CCD_DEF_COS_URL) {
  envConfig.cosUrl = process.env.CCD_DEF_COS_URL;
  envConfig.ccdUrl = process.env.CCD_DEF_CCD_URL;
  envConfig.aacUrl = process.env.CCD_DEF_AAC_URL;
}

// Ensure valid environment config
if (!envConfig.cosUrl || !envConfig.ccdUrl || !envConfig.aacUrl) {
  throw new Error(`Invalid or missing configuration for environment "${environment}".`);
}

// Construct environment variables for subprocess
const envVars = Object.entries({
  TARGET_ENV: environment,
  CCD_DEF_COS_URL: envConfig.cosUrl,
  CCD_DEF_CCD_URL: envConfig.ccdUrl,
  CCD_DEF_AAC_URL: envConfig.aacUrl
}).map(([key, value]) => `${key}=${value}`).join(' ');

const cmd = `${envVars} yarn ${scriptToRun} ${optionalArgs.join(' ')}`;
const subprocess = spawn(cmd, { shell: true, stdio: 'inherit' });

subprocess.on('exit', code => {
  if (code !== 0) {
    throw new Error(`Subprocess exited with code ${code}`);
  }
});
