const I = actor();

module.exports = {
    fields: {
        headerText: 'Respondent details',
        textareaText: 'Respondent details',
        respondentAddress: 'Respondents_0_Address_Address',
        submit: 'button[type="submit"]',
        organisation:  'AAT'
    },
    async searchAndSelectGivenRegisteredOrganisation() {
        I.waitForEnabled('#search-org-text');
        I.wait('2');
        I.fillField('#search-org-text', this.fields.organisation);
        I.click(locate('a').withText('Select').inside(locate('#organisation-table').withDescendant(locate('h3').withText(this.fields.organisation))));
    },
    async respondentDetails() {
        const retryCount = 3;
        await I.triggerEvent(this.fields.headerText);
        await I.waitForPage('h1', this.fields.headerText);
        I.wait('2');
        await I.click('Add new');
        await I.fillField('//input[@id="Respondents_0_FirstName"]', 'Respondent Firstname');
        I.wait('2');
        await I.fillField('//input[@id="Respondents_0_LastName"]', 'Respondent Lastname');
        await I.retry(retryCount).checkOption('//input[@id="Respondents_0_IsDateOfBirthKnown_Yes"]');
        await I.retry(retryCount).fillField('//input[@id="DateOfBirth-day"]', '10');
        await I.retry(retryCount).fillField('//input[@id="DateOfBirth-month"]', '11');
        I.wait('2');
        await I.retry(retryCount).fillField('//input[@id="DateOfBirth-year"]', '1995');
        await I.retry(retryCount).checkOption('//input[@id="Respondents_0_Gender-male"]');
        await I.retry(retryCount).checkOption('//input[@id="Respondents_0_IsPlaceOfBirthKnown_Yes"]');
        await I.fillField('//input[@id="Respondents_0_PlaceOfBirth"]', 'Birmingham');
        await I.retry(retryCount).checkOption('//input[@id="Respondents_0_IsCurrentAddressKnown_Yes"]');
        await I.selectPostCodeLookupAddress(this.fields.respondentAddress, 'B11LS');
        I.wait('2');
        await I.retry(retryCount).checkOption('//input[@id="Respondents_0_IsAtAddressLessThan5YearsWithDontKnow-yes"]');
        await I.retry(retryCount).checkOption('//input[@id="Respondents_0_CanYouProvideEmailAddress_Yes"]');
        await I.fillField('//input[@id="Respondents_0_Email"]', 'respondent@email.com');
        await I.retry(retryCount).checkOption('//input[@id="Respondents_0_CanYouProvidePhoneNumber_Yes"]');
        await I.fillField('//input[@id="Respondents_0_PhoneNumber"]', '07122334667');
        await I.retry(retryCount).checkOption('//input[@id="Respondents_0_DoTheyHaveLegalRepresentation-yes"]');
        I.wait('2');
        await I.fillField('//input[@id="Respondents_0_RepresentativeFirstName"]', 'Ted');
        await I.fillField('//input[@id="Respondents_0_RepresentativeLastName"]', 'Robinson');
        await I.fillField('//input[@id="Respondents_0_SolicitorEmail"]', 'test@example.com');
        await this.searchAndSelectGivenRegisteredOrganisation(),
        I.wait('2');
        await I.click('Continue');
        await I.waitForText('Submit', '30');
        await I.click('Submit');
    }

};
