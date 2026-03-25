Feature('Smoke tests @smoke-tests');
Scenario('dummy test does nothing', ({ I }) => {
  // minimal no-op assertion
  I.say('Running dummy test');
});
