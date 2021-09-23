/* eslint-disable no-invalid-this, require-await */

async function createCase() {
  const I = this;
  I.waitForElement('a[href="/cases/case-filter"]', '60');
  I.click('Create case');
  I.waitForPage('h1', 'Create Case');
  I.waitForElement('select[id="cc-jurisdiction"]>option:nth-of-type(2)', '60');
  I.selectOption('select[id="cc-jurisdiction"]', 'Family Private Law');
  I.wait('1');
  I.selectOption('select[id="cc-case-type"]', 'C100 Application');
  I.wait('1');
  I.selectOption('select[id= "cc-event"]', 'Solicitor application');
  I.click('Start');
  I.waitForPage('h1', 'Solicitor application');
  I.fillField('input[id="ApplicantName"]', 'Test Parent 2');
  I.fillField('input[id="ChildName"]', 'Test Child 2');
  I.click('Continue');
  I.waitForPage('h2', 'Check your answers');
  I.click('Submit');
  I.waitForPage('h2', 'History');
}

module.exports = { createCase };
