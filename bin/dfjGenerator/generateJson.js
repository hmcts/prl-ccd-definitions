#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const JSON_SPACING = 2;

function main() {
  const csvArg = process.argv[2];
  if (!csvArg) {
    console.error('Usage: ./bin/dfjGenerator/generateJson <pathToCSV>');
    process.exit(1);
  }

  const csvPath = path.resolve(process.cwd(), csvArg);
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  const csv = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCsv(csv);

  const byArea = buildAreaMap(rows);
  const areas = Array.from(byArea.keys()).sort((a, b) => {return a.localeCompare(b);});

  const outputRoot = path.resolve(process.cwd(), 'definitions/private-law/json');

  writeCaseFieldJson(outputRoot, areas);
  writeOverallAreaFixedListsJson(outputRoot, areas);
  writePerAreaCourtFixedListsJson(outputRoot, areas, byArea);
  writeWorkBasketInputFieldsJson(outputRoot, areas);
  writeAuthorisationCaseFieldJson(outputRoot, areas);

  console.log(`DFJ JSON generation complete from ${csvPath}`);
}

function buildAreaMap(rows) {
  const map = new Map();

  for (const row of rows) {
    const courtCode = String(row.courtCode || '').trim();
    const shortName = String(row.shortName || '').trim();
    const dfjArea = String(row.dfjArea || '').trim();

    if (!courtCode || !shortName || !dfjArea) {
      continue;
    }

    if (!map.has(dfjArea)) {
      map.set(dfjArea, []);
    }

    map.get(dfjArea).push({
      code: courtCode,
      shortName
    });
  }

  for (const area of map.keys()) {
    map.get(area).sort((a, b) => {return a.shortName.localeCompare(b.shortName);});
  }

  return map;
}

function writeCaseFieldJson(root, areas) {
  const filePath = path.join(root, 'CaseField/DFJArea/CaseField.json');
  ensureDir(path.dirname(filePath));

  const payload = [
    {
      LiveFrom: '01/01/2018',
      CaseTypeID: 'PRLAPPS',
      ID: 'dfjArea',
      Label: 'DFJ Area :',
      FieldType: 'FixedList',
      FieldTypeParameter: 'DFJArea',
      SecurityClassification: 'Public',
      Searchable: 'Y'
    },
    ...areas.map((area) => {
      const camel = toCamelArea(area);
      const pascal = toPascalArea(area);
      return {
        LiveFrom: '01/01/2018',
        CaseTypeID: 'PRLAPPS',
        ID: `${camel}DFJCourt`,
        Label: `${camel}DFJCourt :`,
        FieldType: 'FixedList',
        FieldTypeParameter: `${pascal}DFJCourts`,
        SecurityClassification: 'Public',
        Searchable: 'Y'
      };
    })
  ];

  fs.writeFileSync(filePath, JSON.stringify(payload, null, JSON_SPACING) + '\n', 'utf8');
}

function writeOverallAreaFixedListsJson(root, areas) {
  const filePath = path.join(root, 'FixedLists/DFJArea/FixedLists.json');
  ensureDir(path.dirname(filePath));

  const payload = areas.map((area, index) => {return {
    LiveFrom: '01/01/2018',
    ID: 'DFJArea',
    ListElementCode: area, // e.g. DERBY, ESSEX_AND_SUFFOLK
    ListElement: toAreaDisplayLabel(area), // e.g. Derby, Essex and Suffolk
    DisplayOrder: index + 1
  };});

  fs.writeFileSync(filePath, JSON.stringify(payload, null, JSON_SPACING) + '\n', 'utf8');
}

function writePerAreaCourtFixedListsJson(root, areas, byArea) {
  for (const area of areas) {
    const pascal = toPascalArea(area);
    const listId = `${pascal}DFJCourts`;
    const filePath = path.join(
      root,
      `FixedLists/DFJArea/DFJ${pascal}/FixedLists.json`
    );
    ensureDir(path.dirname(filePath));

    const courts = byArea.get(area) || [];
    const payload = courts.map((court, index) => {return {
      LiveFrom: '01/01/2018',
      ID: listId,
      ListElementCode: court.code,
      ListElement: court.shortName,
      DisplayOrder: index + 1
    };});

    fs.writeFileSync(filePath, JSON.stringify(payload, null, JSON_SPACING) + '\n', 'utf8');
  }
}

function writeWorkBasketInputFieldsJson(root, areas) {
  const filePath = path.join(
    root,
    'WorkBasketInputFields/DFJFilters/WorkBasketInputFields.json'
  );
  ensureDir(path.dirname(filePath));

  const payload = [
    {
      LiveFrom: '01/01/2017',
      CaseTypeID: 'PRLAPPS',
      CaseFieldID: 'dfjArea',
      Label: 'DFJ Area',
      DisplayOrder: 1
    },
    ...areas.map((area) => {return {
      LiveFrom: '01/01/2017',
      CaseTypeID: 'PRLAPPS',
      CaseFieldID: `${toCamelArea(area)}DFJCourt`,
      Label: 'Court',
      DisplayOrder: 2,
      FieldShowCondition: `dfjArea = "${area}"`
    };})
  ];

  fs.writeFileSync(filePath, JSON.stringify(payload, null, JSON_SPACING) + '\n', 'utf8');
}

function writeAuthorisationCaseFieldJson(root, areas) {
  const filePath = path.join(
    root,
    'AuthorisationCaseField/DFJArea/AuthorisationCaseField.json'
  );
  ensureDir(path.dirname(filePath));

  const accessControlTemplate = [
    {
      UserRoles: [
        'caseworker-privatelaw-systemupdate',
        'caseworker-privatelaw-courtadmin',
        'caseworker-privatelaw-la',
        'caseworker-privatelaw-judge'
      ],
      CRUD: 'CRUD'
    },
    {
      UserRoles: [
        'caseworker-wa-task-configuration',
        'caseworker-privatelaw-readonly',
        'caseworker-privatelaw-solicitor',
        'caseworker-privatelaw-superuser',
        'caseworker-privatelaw-externaluser-viewonly'
      ],
      CRUD: 'R'
    }
  ];

  const payload = [
    {
      LiveFrom: '19/04/2022',
      CaseTypeID: 'PRLAPPS',
      CaseFieldID: 'dfjArea',
      AccessControl: deepClone(accessControlTemplate)
    },
    ...areas.map((area) => {return {
      LiveFrom: '19/04/2022',
      CaseTypeID: 'PRLAPPS',
      CaseFieldID: `${toCamelArea(area)}DFJCourt`,
      AccessControl: deepClone(accessControlTemplate)
    };})
  ];

  fs.writeFileSync(filePath, JSON.stringify(payload, null, JSON_SPACING) + '\n', 'utf8');
}

function toPascalArea(area) {
  return String(area)
    .trim()
    .toLowerCase()
    .split('_')
    .filter(Boolean)
    .map((part) => {return part.charAt(0).toUpperCase() + part.slice(1);})
    .join('');
}

function toCamelArea(area) {
  const pascal = toPascalArea(area);
  return pascal ? pascal.charAt(0).toLowerCase() + pascal.slice(1) : '';
}

function toAreaDisplayLabel(area) {
  return String(area)
    .trim()
    .toLowerCase()
    .split('_')
    .filter(Boolean)
    .map((word) =>
    {return word === 'and' ? 'and' : word.charAt(0).toUpperCase() + word.slice(1);}
    )
    .join(' ');
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Minimal CSV parser that supports quoted values and escaped quotes ("").
 */
function parseCsv(content) {
  const lines = content.split(/\r?\n/).filter((line) => {return line.trim() !== '';});
  if (lines.length === 0) {
    return [];
  }

  const headers = parseCsvLine(lines[0]).map((h) => {return h.trim();});
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i]);
    if (cells.length === 0) {
      continue;
    }

    const row = {};
    for (let c = 0; c < headers.length; c++) {
      row[headers[c]] = (cells[c] || '').trim();
    }
    rows.push(row);
  }

  return rows;
}

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }

  result.push(current);
  return result;
}

main();