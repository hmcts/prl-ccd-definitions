Feature('Respondent\'s Behaviour');

Scenario('Respondent Behaviour - basic journey', async I => {
    await I.loginAsSolicitor();
    await I.createCaseFL401();
    await I.runRespondentBehaviour();
}).retry({ retries: 3, minTimeout: 30000 });
