const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  parseCsv,
  toPascalArea,
  toCamelArea,
  toAreaDisplayLabel,
  buildAreaMap,
  writeCaseFieldJson,
  writeOverallAreaFixedListsJson,
  writePerAreaCourtFixedListsJson,
  writeWorkBasketInputFieldsJson,
  writeAuthorisationCaseFieldJson
} = require('../../../definitions/dfjGenerator/generateJson');

function mkTempRoot() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'dfj-generator-test-'));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

describe('dfj generator helpers', () => {
  it('normalises area names correctly', () => {
    assert.strictEqual(toPascalArea('WEST_LONDON'), 'WestLondon');
    assert.strictEqual(toCamelArea('WEST_LONDON'), 'westLondon');
    assert.strictEqual(toAreaDisplayLabel('ESSEX_AND_SUFFOLK'), 'Essex and Suffolk');
  });

  it('parseCsv handles quoted fields with commas', () => {
    const csv = [
      'courtCode,shortName,dfjArea',
      '123,"Southend, Combined",ESSEX_AND_SUFFOLK'
    ].join('\n');

    const rows = parseCsv(csv);
    assert.strictEqual(rows.length, 1);
    assert.deepStrictEqual(rows[0], {
      courtCode: '123',
      shortName: 'Southend, Combined',
      dfjArea: 'ESSEX_AND_SUFFOLK'
    });
  });

  it('buildAreaMap groups and sorts by shortName', () => {
    const rows = [
      { courtCode: '2', shortName: 'Beta Court', dfjArea: 'SWANSEA' },
      { courtCode: '1', shortName: 'Alpha Court', dfjArea: 'SWANSEA' },
      { courtCode: '3', shortName: 'Gamma Court', dfjArea: 'KENT' }
    ];

    const map = buildAreaMap(rows);
    assert.deepStrictEqual(Array.from(map.keys()).sort(), ['KENT', 'SWANSEA']);
    assert.deepStrictEqual(map.get('SWANSEA'), [
      { code: '1', shortName: 'Alpha Court' },
      { code: '2', shortName: 'Beta Court' }
    ]);
  });
});

describe('dfj generator outputs', () => {
  const areas = ['ESSEX_AND_SUFFOLK', 'WEST_LONDON'];
  const byArea = new Map([
    [
      'ESSEX_AND_SUFFOLK',
      [
        { code: '200', shortName: 'Ipswich' },
        { code: '100', shortName: 'Chelmsford' }
      ]
    ],
    [
      'WEST_LONDON',
      [
        { code: '300', shortName: 'Barnet Family Court' }
      ]
    ]
  ]);

  it('writes CaseField with root first and camel-case court fields', () => {
    const root = mkTempRoot();
    writeCaseFieldJson(root, areas);

    const file = path.join(root, 'CaseField/DFJArea/CaseField.json');
    const json = readJson(file);

    assert.strictEqual(json[0].ID, 'dfjArea');
    assert.strictEqual(json[0].FieldTypeParameter, 'DFJArea');

    assert.strictEqual(json[1].ID, 'essexAndSuffolkDFJCourt');
    assert.strictEqual(json[1].FieldTypeParameter, 'EssexAndSuffolkDFJCourts');

    assert.strictEqual(json[2].ID, 'westLondonDFJCourt');
    assert.strictEqual(json[2].FieldTypeParameter, 'WestLondonDFJCourts');
  });

  it('writes overall area FixedLists with uppercase ListElementCode and sentence-case labels', () => {
    const root = mkTempRoot();
    writeOverallAreaFixedListsJson(root, areas);

    const file = path.join(root, 'FixedLists/DFJArea/FixedLists.json');
    const json = readJson(file);

    assert.deepStrictEqual(json, [
      {
        LiveFrom: '01/01/2018',
        ID: 'DFJArea',
        ListElementCode: 'ESSEX_AND_SUFFOLK',
        ListElement: 'Essex and Suffolk',
        DisplayOrder: 1
      },
      {
        LiveFrom: '01/01/2018',
        ID: 'DFJArea',
        ListElementCode: 'WEST_LONDON',
        ListElement: 'West London',
        DisplayOrder: 2
      }
    ]);
  });

  it('writes per-area court FixedLists with correct ID and DisplayOrder', () => {
    const root = mkTempRoot();
    writePerAreaCourtFixedListsJson(root, areas, byArea);

    const essexFile = path.join(
      root,
      'FixedLists/DFJArea/DFJEssexAndSuffolk/FixedLists.json'
    );
    const westFile = path.join(
      root,
      'FixedLists/DFJArea/DFJWestLondon/FixedLists.json'
    );

    const essex = readJson(essexFile);
    const west = readJson(westFile);

    assert.deepStrictEqual(essex[0], {
      LiveFrom: '01/01/2018',
      ID: 'EssexAndSuffolkDFJCourts',
      ListElementCode: '200',
      ListElement: 'Ipswich',
      DisplayOrder: 1
    });
    assert.deepStrictEqual(essex[1], {
      LiveFrom: '01/01/2018',
      ID: 'EssexAndSuffolkDFJCourts',
      ListElementCode: '100',
      ListElement: 'Chelmsford',
      DisplayOrder: 2
    });

    assert.deepStrictEqual(west[0], {
      LiveFrom: '01/01/2018',
      ID: 'WestLondonDFJCourts',
      ListElementCode: '300',
      ListElement: 'Barnet Family Court',
      DisplayOrder: 1
    });
  });

  it('writes WorkBasketInputFields with dfjArea root and area conditions', () => {
    const root = mkTempRoot();
    writeWorkBasketInputFieldsJson(root, areas);

    const file = path.join(
      root,
      'WorkBasketInputFields/DFJFilters/WorkBasketInputFields.json'
    );
    const json = readJson(file);


    assert.deepStrictEqual(json[0], {
      LiveFrom: '01/01/2017',
      CaseTypeID: 'PRLAPPS',
      CaseFieldID: 'dfjArea',
      Label: 'DFJ Area',
      DisplayOrder: 1
    });

    assert.strictEqual(json[1].CaseFieldID, 'essexAndSuffolkDFJCourt');
    assert.strictEqual(json[1].Label, 'Court');
    const expectedDisplayOrder = 2;
    assert.strictEqual(json[1].DisplayOrder, expectedDisplayOrder);
    assert.strictEqual(json[1].FieldShowCondition, 'dfjArea = "ESSEX_AND_SUFFOLK"');

    assert.strictEqual(json[2].CaseFieldID, 'westLondonDFJCourt');
    assert.strictEqual(json[2].FieldShowCondition, 'dfjArea = "WEST_LONDON"');
  });

  it('writes AuthorisationCaseField with root and duplicated access control', () => {
    const root = mkTempRoot();
    writeAuthorisationCaseFieldJson(root, areas);

    const file = path.join(
      root,
      'AuthorisationCaseField/DFJArea/AuthorisationCaseField.json'
    );
    const json = readJson(file);
    const expectedAccessControlLength = 2;

    assert.strictEqual(json[0].CaseFieldID, 'dfjArea');
    assert.strictEqual(json[1].CaseFieldID, 'essexAndSuffolkDFJCourt');
    assert.strictEqual(json[2].CaseFieldID, 'westLondonDFJCourt');

    json.forEach((row) => {
      assert.strictEqual(row.LiveFrom, '19/04/2022');
      assert.strictEqual(row.CaseTypeID, 'PRLAPPS');
      assert.ok(Array.isArray(row.AccessControl));
      assert.strictEqual(row.AccessControl.length, expectedAccessControlLength);
    });
  });
});