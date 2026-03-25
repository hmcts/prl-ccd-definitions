Feature('Smoke tests @smoke-tests');
Scenario('dummy test does nothing', ({ I }) => {
  I.say = function (runningDummyTest) {

  };
  // minimal no-op assertion
  I.say('Running dummy test');
});
