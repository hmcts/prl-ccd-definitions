const { expect, assert } = require('chai');
const { find } = require('lodash');

function createAssertExists(type) {
  return (authorisations, allDefinedRowsForEnv) => {
    const errors = [];

    authorisations.forEach(authDefinition => {
      try {
        expect(find(allDefinedRowsForEnv, ['ID', authDefinition[`Case${type}ID`]]))
          .to.be.an('object');
      } catch (error) {
        console.log("Case field missing: "  + authDefinition[`Case${type}ID`])
        errors.push(`\n${type} ${authDefinition[type]} is not defined`);
      }
    });

    if (errors.length) {
      assert.fail(`Broken tests (${errors.length}): ${errors}`);
    }
  };
}

module.exports = { createAssertExists };
