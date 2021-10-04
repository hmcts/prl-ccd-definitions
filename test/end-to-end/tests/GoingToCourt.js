Feature('Going to court');

Scenario('Going to court event - basic journey', I => {
  I.loginAsSolicitor();
  I.createCase();
  I.runEventHappyPath();
}).retry({ retries: 3, minTimeout: 30000 });
