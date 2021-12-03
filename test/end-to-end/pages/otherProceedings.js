const I = actor();

module.exports = {
    fields: {
        headerText: 'Other proceedings',
        previousOrOngoingProceedingsForChildren: '#PreviousOrOngoingProceedingsForChildren-yes',
        existingProceedings_0_PreviousOrOngoingProceedings: '#ExistingProceedings_0_PreviousOrOngoingProceedings-Ongoing',
        existingProceedings_0_CaseNumber: '#ExistingProceedings_0_CaseNumber',
        dateStartedDay: '#DateStarted-day',
        dateStartedMonth: '#DateStarted-month',
        dateStartedYear: '#DateStarted-year',
        dateEndedDay: '#DateEnded-day',
        dateEndedMonth: '#DateEnded-month',
        dateEndedYear: '#DateEnded-year',
        typeOfOrderEmergencyProtectionOrder: '#ExistingProceedings_0_TypeOfOrder-EmergencyProtectionOrder',
        existingProceedings_0_NameOfJudge: '#ExistingProceedings_0_NameOfJudge',
        existingProceedings_0_NameOfCourt: '#ExistingProceedings_0_NameOfCourt',
        existingProceedings_0_NameOfChildrenInvolved: '#ExistingProceedings_0_NameOfChildrenInvolved',
        existingProceedings_0_NameOfGuardian: '#ExistingProceedings_0_NameOfGuardian',
        existingProceedings_0_NameAndOffice: '#ExistingProceedings_0_NameAndOffice',
    },
    async  otherProceedingsEvent() {
        await I.triggerEvent(this.fields.headerText);
        await I.waitForPage('h1', this.fields.headerText);
        await I.click(this.fields.previousOrOngoingProceedingsForChildren);
        await I.wait('2');
        await I.click('Add new');
        await I.wait('2');
        await I.click(this.fields.existingProceedings_0_PreviousOrOngoingProceedings);
        await I.fillField(this.fields.existingProceedings_0_CaseNumber, '123456789');
        await I.fillField(this.fields.dateStartedDay, '12');
        await I.fillField(this.fields.dateStartedMonth, '12');
        await I.wait('2');
        await I.fillField(this.fields.dateStartedYear, '2021');
        await I.fillField(this.fields.dateEndedDay, '13');
        await I.fillField(this.fields.dateEndedMonth, '12');
        await I.wait('2');
        await I.fillField(this.fields.dateEndedYear, '2021');
        await I.click(this.fields.typeOfOrderEmergencyProtectionOrder);
        await I.fillField(this.fields.existingProceedings_0_NameOfJudge, 'Sir James Holman');
        await I.fillField(this.fields.existingProceedings_0_NameOfCourt, 'Uxbridge');
        await I.fillField(this.fields.existingProceedings_0_NameOfChildrenInvolved, 'Olivia, Amelia');
        await I.fillField(this.fields.existingProceedings_0_NameOfGuardian, 'Mia');
        await I.fillField(this.fields.existingProceedings_0_NameAndOffice, 'Grace');
        await I.click('Continue');
        await I.waitForText('Check your answers');
        await I.waitForText('Submit', '30');
        await I.click('Submit');
    }

};
