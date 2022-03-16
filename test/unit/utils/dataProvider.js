const load = require;
const fs = require('fs');
const path = require('path');
const { setEnvironmentData } = require('worker_threads');

const loadFile = file => {
  return Object.assign(load(`../../../definitions/private-law/json/${file}.json`), []);
};


let fieldsArray = [];
getFieldata = (filePath, fileType) => {
  fieldsArray = [];
  processDir(filePath, fileType);
  return fieldsArray;
}

processDir = (filePath, fileType) => {
  const fileNames = fs.readdirSync(path.resolve(__dirname, filePath));
  fileNames.forEach((filename) => {
    var current_object = path.resolve(__dirname, filePath + '/' + filename); 
    let stat = fs.statSync(current_object);
    if (stat.isFile()) {
      if (filename === fileType) {
        let content = Object.assign(load(current_object), []);
        fieldsArray = [...fieldsArray, ...content];
      }
    } else if (stat.isDirectory()) {
      processDir(current_object, fileType);
    }
  });
}

module.exports = {
  ccdData: {
    AuthorisationCaseState: loadFile('AuthorisationCaseState'),
    AuthorisationCaseType: loadFile('AuthorisationCaseType'),
    CaseEvent: loadFile('CaseEvent'),
    CaseRoles: loadFile('CaseRoles'),
    CaseType: loadFile('CaseType'),
    FixedLists: loadFile('FixedLists'),
    Jurisdiction: loadFile('Jurisdiction'),
    SearchInputFields: loadFile('SearchInputFields'),
    SearchResultFields: loadFile('SearchResultFields'),
    State: loadFile('State'),
    UserProfile: loadFile('UserProfile'),
    WorkBasketInputFields: loadFile('WorkBasketInputFields'),
    WorkBasketResultFields: loadFile('WorkBasketResultFields')
  },
  caseFieldata: getFieldata('../../../definitions/private-law/json', 'CaseField.json'),
  AuthorisationCaseFieldData: getFieldata('../../../definitions/private-law/json', 'AuthorisationCaseField.json'),
  CaseEventToFieldData: getFieldata('../../../definitions/private-law/json', 'CaseEventToFields.json'),
  CaseTypeTab: getFieldata('../../../definitions/private-law/json', 'CaseTypeTab.json'),
  AuthorisationCaseEvent: getFieldata('../../../definitions/private-law/json', 'AuthorisationCaseEvent.json'),
  CaseEventToComplexTypes: getFieldata('../../../definitions/private-law/json', 'CaseEventToComplexTypes.json'),
  ComplexTypes: getFieldata('../../../definitions/private-law/json', 'ComplexTypes.json')
};