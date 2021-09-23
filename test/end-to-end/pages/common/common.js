/* eslint-disable no-undefined, no-invalid-this */

async function waitForPage(header, headerText) {
  const I = this;

  try {
    if (headerText === undefined) {
      await I.waitForElement(header, '90');
    } else {
      await I.waitForText(headerText, '90', header);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { waitForPage };
