Feature('Going to court');

Scenario('Going to court event - basic journey', I => {
  I.loginAsSolicitor();
  I.createCase();
  I.goingToCourtSelectNoForAll();
}).retry({ retries: 3, minTimeout: 30000 });

Scenario('Going to court event - complex journey', I => {
  I.loginAsSolicitor();
  I.createCase();
  I.goingToCourtSelectYesForAll();
}).retry({ retries: 3, minTimeout: 30000 });
