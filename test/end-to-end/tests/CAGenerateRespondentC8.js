Feature('Court Admin / Judge / LA Amend Respondent details - Email, Address, Phone number - Confidential - C8 Generation - TS Solicitor Application');

Scenario(
  'Amend Respondent Email, Address, Phone number as Confidential @nightly',
  async I => {
    await I.loginAsCourtAdmin();
    await I.createC100CaseByCourtAdmin();
    await I.updateRespondentsDetailsConfidential();
  }
).retry({ retries: 3, minTimeout: 30000 });