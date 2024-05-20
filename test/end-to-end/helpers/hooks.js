const event = require('codeceptjs').event;

const codeceptMochawesomeLog = require('./reportLogger');


module.exports = () => {
  event.dispatcher.on(event.test.before, test => {
    codeceptMochawesomeLog.AddMessage(`************ Test status|${test.title}:${test.state}`);
    actor().flushLogsToReport();
  });
  event.dispatcher.on(event.test.after, async test => {
    codeceptMochawesomeLog.AddMessage(`************ Test status|${test.title}:${test.state}`);
    actor().flushLogsToReport();

    if (test.state === 'failed') {
      codeceptMochawesomeLog.AddMessage('*************** Browser error logs ***************');

      let errorLogs = await actor().grabBrowserLogs();
      // eslint-disable-next-line array-callback-return
      errorLogs = errorLogs.filter(error => {
        error._event.type.includes('error');
      });
      for (const error of errorLogs) {
        codeceptMochawesomeLog.AddMessage(`${error._event.type}:${error._event.location.url} =>  ${error._event.text} `);
      }
    }
  });


  event.dispatcher.on(event.test.passed, () => {
    codeceptMochawesomeLog.AddMessage('************ Test passed');
  });
};
