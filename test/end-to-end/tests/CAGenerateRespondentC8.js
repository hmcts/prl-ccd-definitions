Feature('Court Admin / Judge / LA Amend Respondent details - Email, Address, Phone number - Confidential - C8 Generation - TS Court Admin Application');

Scenario(
  'Amend Respondent Email, Address, Phone number as Confidential @master',
  async I => {
    await I.loginAsCourtAdmin();
    await I.createC100CaseByCourtAdmin();
    await I.updateRespondentsDetailsConfidential();
  }
).retry({ retries: 3, minTimeout: 30000 });

Scenario(
  'Judge - Amend Respondent Email, Address, Phone number as Confidential @master',
  async I => {
    await I.loginAsCourtAdmin();
    await I.createC100CaseByCourtAdmin();
    await I.loginAsJudge();
    await I.updateRespondentsDetailsConfidential();
  }
).retry({ retries: 3, minTimeout: 30000 });

Scenario(
  'Legal Adviser - Amend Respondent Email, Address, Phone number as Confidential @master',
  async I => {
    await I.loginAsCourtAdmin();
    await I.createC100CaseByCourtAdmin();
    await I.loginAsLegalAdviser();
    await I.updateRespondentsDetailsConfidential();
  }
).retry({ retries: 3, minTimeout: 30000 });