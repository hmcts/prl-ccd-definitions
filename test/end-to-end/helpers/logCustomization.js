
const testLogger = require('./testLogger');

function overrideConsoleLogforWorkersThreads() {
  const consoleLogRef = console.log;
  const consoleErrorRef = console.error;
  global.console.log = message => {
    consoleLogRef(message);
    testLogger.AddMessage(`${message}`);
  };


  global.console.error = error => {
    consoleErrorRef(error);
    testLogger.AddMessage(`${error}`);
  };
}

module.exports = { overrideConsoleLogforWorkersThreads };
