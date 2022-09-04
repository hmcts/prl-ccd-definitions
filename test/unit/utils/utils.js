const load = require;
const { sortBy, uniqBy, map } = require('lodash');
const { expect } = require('chai');

const SHORT_STRING = 30;
const MEDIUM_STRING = 70;
const LONG_STRING = 150;

function isFieldDuplicated(field) {
  return function isDuplicated(field1, field2) {
    if (field1.CaseTypeID === field2.CaseTypeID
      && field1[field] === field2[field]
      && field1.AccessProfile === field2.AccessProfile) {
      console.log(`Duplicated field: ${field1[field]}`);
    }
    return field1.CaseTypeID === field2.CaseTypeID
            && field1[field] === field2[field]
            && field1.AccessProfile === field2.AccessProfile;
  };
}

function isCaseEventToFieldDuplicated(field) {
  return function isDuplicated(field1, field2) {
    if (field1.CaseTypeID === field2.CaseTypeID
        && field1.CaseTypeID === field2.CaseTypeID
        && field1.CaseEventID === field2.CaseEventID
        && field1[field] === field2[field]) {
      console.log(`Duplicated field: ${field1[field]}`);
    }
    return field1.CaseTypeID === field2.CaseTypeID
            && field1.CaseTypeID === field2.CaseTypeID
            && field1.CaseEventID === field2.CaseEventID
            && field1[field] === field2[field];
  };
}

function isNotEmpty() {
  return v => {
    return v !== null && v.length > 0;
  };
}

function isNotLongerThan(maxLength) {
  return v => {
    return v !== null && v.length > 0 && v.length <= maxLength;
  };
}

function isPositiveNumber() {
  return v => {
    return typeof v === 'number' && v > 0;
  };
}

function whenPopulated(key, type) {
  const myType = type || 'string';
  return {
    expect: satisfyCallback => {
      if (key) {
        expect(key).to.be.a(myType).and.satisfy(satisfyCallback);
      }
    }
  };
}

function noDuplicateFound(a, b) {
  if (a.CaseTypeID === b.CaseTypeID && a.ID === b.ID) {
    console.log(`Duplicated field: ${a.ID}`);
  }
  return a.CaseTypeID === b.CaseTypeID && a.ID === b.ID;
}

function noDuplicateFoundWB(a, b) {
  return a.CaseTypeID === b.CaseTypeID && a.ID === b.ID && a.CaseFieldID === b.CaseFieldID;
}

function noDuplicateFoundFL(a, b) {
  return a.ID === b.ID && a.ListElementCode === b.ListElementCode;
}

function noDuplicateFoundCT(a, b) {
  return a.CaseTypeID === b.CaseTypeID && a.TabID === b.TabID && a.CaseFieldID === b.CaseFieldID;
}

function noDuplicateFoundCaseEventToField(a, b) {
  return a.CaseTypeID === b.CaseTypeID && a.CaseEventID === b.CaseEventID && a.CaseFieldID === b.CaseFieldID && a.PageDisplayOrder === b.PageDisplayOrder;
}


function noDuplicateFoundEvent(a, b) {
  return a.CaseTypeID === b.CaseTypeID && a.CaseEventID === b.CaseEventID && a.AccessProfile === b.AccessProfile;
}

function noDuplicateFoundACT(a, b) {
  return a.CaseTypeID === b.CaseTypeID && a.AccessProfile === b.AccessProfile;
}

function noDuplicateFoundCCT(a, b) {
  return a.CaseTypeID === b.CaseTypeID && a.ID === b.ID && a.CaseEventID === b.CaseEventID && a.CaseFieldID === b.CaseFieldID && a.ListElementCode === b.ListElementCode;
}

function loadAllFiles(location) {
  return function loadFeatureFiles(featureFiles) {
    let definitions = [];

    featureFiles.forEach(featureFile => {
      definitions = definitions
        .concat(load(`definitions/private-law/json/${location}/${featureFile}.json`));
    });

    return definitions;
  };
}

function sortCaseTypeTabs(caseTypeTab) {
  return sortBy(caseTypeTab, tab => {
    return tab.TabDisplayOrder;
  });
}

function getUniqValues(objectArray, property) {
  return map(uniqBy(objectArray, property), obj => {
    return obj[property];
  });
}

function byCaseType(caseType) {
  return entry => {
    return entry.CaseTypeID === caseType;
  };
}

function byStateName(stateEntry) {
  return stateAuth => {
    return stateAuth.CaseStateID === stateEntry.ID;
  };
}

function mapErrorArray(caseType) {
  return entry => {
    return {
      AccessProfile: entry.AccessProfile,
      CaseType: caseType
    };
  };
}

function missingAuthorisationsExist(missingAuthCount) {
  return missingAuthCount > 0;
}

module.exports = {
  SHORT_STRING,
  MEDIUM_STRING,
  LONG_STRING,
  isFieldDuplicated,
  isCaseEventToFieldDuplicated,
  loadAllFiles,
  sortCaseTypeTabs,
  noDuplicateFound,
  noDuplicateFoundWB,
  noDuplicateFoundFL,
  noDuplicateFoundCT,
  noDuplicateFoundCCT,
  noDuplicateFoundACT,
  noDuplicateFoundEvent,
  noDuplicateFoundCaseEventToField,
  isNotEmpty,
  isNotLongerThan,
  isPositiveNumber,
  whenPopulated,
  getUniqValues,
  byCaseType,
  byStateName,
  mapErrorArray,
  missingAuthorisationsExist
};
