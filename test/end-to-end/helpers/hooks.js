const event = require('codeceptjs').event;

const testLogger = require('./testLogger');

const I = actor();

module.exports = () => {
  event.dispatcher.on(event.test.before, test => {
    testLogger.setupTestLogFile(test);
    const emptyLines = 2;
    testLogger.AddEmptyLines(emptyLines);

    testLogger.AddMessage(`************ Test started | ${test.title}:${test.state}`);
    // actor().flushLogsToReport();
  });
  event.dispatcher.on(event.test.after, async test => {
    testLogger.AddMessage(`************ Test ${test.state} | ${test.title}:${test.state}`);
    const logs = await I.grabBrowserLogs();
    for (const log of logs) {
      if (log.type() === 'error' && !log._event.location.url.endsWith('.js')) {
        testLogger.AddMessage(`${log.type()}: ${log.text()} => ${log._event.location.url}`);
      }
    }
    // const errors = logs.map(l => {
    //   return { type: l.type(), text: l.text() };
    // }).filter(l => {
    //   return l.type === 'error';
    // });
    // console.log(JSON.stringify(errors));
    // testLogger.AddMessage(JSON.stringify(errors));
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
