const I = actor();
const retryCount = 3;

module.exports = {
  async openCaseFileViewTab() {
    const tabName = 'Case File View';
    await I.retry(retryCount)
      .selectTab(tabName);
    await I.wait('5');
  },
  async clickApplicationsFolder() {
    await I.retry(retryCount).click('Applications');
    await I.wait('1');
  },
  async clickRespondentDocumentFolder() {
    await I.retry(retryCount).click('Respondent Documents');
    await I.wait('1');
  },
  async clickRespondentC1AResponseFolder() {
    await I.retry(retryCount).click('Respondent C1A Response');
    await I.wait('1');
  },
  async openRespondentC1AResponseFile() {
    await I.retry(retryCount).waitForText('dummy.pdf');
    await I.retry(retryCount).click('dummy.pdf');
    await I.wait('5');
  },
  async verifyRespondentC1AResponseFile() {
    await this.openCaseFileViewTab();
    await this.clickApplicationsFolder();
    await this.clickRespondentDocumentFolder();
    await this.clickRespondentC1AResponseFolder();
    await this.openRespondentC1AResponseFile();
  }

};
