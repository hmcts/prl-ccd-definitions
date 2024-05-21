const event = require('codeceptjs').event;

const testLogger = require('./testLogger');


module.exports = () => {
  event.dispatcher.on(event.test.before, test => {
    testLogger.setupTestLogFile(test);
    const emptyLines = 2;
    testLogger.AddEmptyLines(emptyLines);

    testLogger.AddMessage(`************ Test started | ${test.title}:${test.state}`);
    // actor().flushLogsToReport();
  });
  event.dispatcher.on(event.test.after, test => {
    testLogger.AddMessage(`************ Test ${test.state} | ${test.title}:${test.state}`);
    // actor().flushLogsToReport();

    // if (test.state === 'failed') {
    //   let errorLogs = await actor().grabBrowserLogs();
    //   // eslint-disable-next-line array-callback-return
    //   errorLogs = errorLogs.filter(error => {
    //     error._event.type.includes('error');
    //   });
    //   for (const error of errorLogs) {
    //     testLogger.AddMessage(`${error._event.type}:${error._event.location.url} =>  ${error._event.text} `);
    //   }
    // }
  });


  event.dispatcher.on(event.test.passed, () => {
    testLogger.AddMessage('************ Test passed');
  });
};
