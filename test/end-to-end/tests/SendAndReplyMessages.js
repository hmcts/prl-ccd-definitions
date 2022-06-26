Feature('Send and Reply to messages via case event, as different users');

Scenario('Create a Case as a Solicitor, Send and Reply to Messages via Case Event as Court Admin Users', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  let createdCaseUrl = await I.getCurrentPageUrl();
  await I.loginAsCourtAdminUserOne();
  await I.amOnPage(createdCaseUrl);
  await I.sendMessage();

}).retry({ retries: 3, minTimeout: 30000 });
