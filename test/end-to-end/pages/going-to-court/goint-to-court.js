/* eslint-disable no-invalid-this, require-await */

function selectNo(field) {
  const I = this;
  I.click(`${field}_No`);
}

function selectYes(field) {
  const I = this;
  I.click(`${field}_Yes`);
}

async function goingToCourtSelectNoForAll() {
  const I = this;
  I.selectOption('select[id="next-step"]', 'Going to court');
  I.click('Go');
  I.waitForPage('h1', 'Going to court');

  selectNo('IsWelshNeeded');
  selectNo('IsInterpreterNeeded');
  selectNo('IsDisabilityPresent');
  selectNo('IsSpecialArrangementsRequired');
  selectNo('IsIntermediaryNeeded');

  I.wait('5');
  I.click('Continue');

  I.waitForText('Submit', '30');
  I.click('Submit');
}

async function goingToCourtSelectYesForAll() {
  const I = this;
  I.selectOption('select[id="next-step"]', 'Going to court');
  I.click('Go');
  I.waitForPage('h1', 'Going to court');

  selectYes('IsWelshNeeded');
  I.wait('1');
  I.see('Welsh needs');
  this.fillField('WelshNeeds_0_WhoNeedsWelsh', 'Joe Doe');
  I.click('WelshNeeds_0_SpokenOrWritten-Spoken');
  I.click('WelshNeeds_0_SpokenOrWritten-Written');
  I.click('WelshNeeds_0_SpokenOrWritten-Both');

  selectYes('IsInterpreterNeeded');
  I.wait('1');
  I.see('Interpreter needs');
  I.click('InterpreterNeeds_0_Party-Applicant');
  I.click('InterpreterNeeds_0_Party-Respondent');
  I.click('InterpreterNeeds_0_Party-Other');
  this.fillField('InterpreterNeeds_0_Name', 'Person One');
  this.fillField('InterpreterNeeds_0_Language', 'Polish');

  selectYes('IsDisabilityPresent');
  I.wait('1');
  I.see('Describe the adjustments that the court needs to make.');
  this.fillField('AdjustmentsRequired', 'Example text - adjustment');

  selectYes('IsSpecialArrangementsRequired');
  I.wait('1');
  I.see('Give details of the special arrangements that are required.');
  this.fillField('SpecialArrangementsRequired', 'Example text - arrangements');

  selectYes('IsIntermediaryNeeded');
  I.wait('1');
  I.see('Set out the reasons that an intermediary is required.');
  this.fillField('ReasonsForIntermediary', 'Example text - intermediary');

  I.wait('5');
  I.click('Continue');

  I.waitForText('Submit', '30');
  I.click('Submit');
}

module.exports = { goingToCourtSelectNoForAll, goingToCourtSelectYesForAll };
