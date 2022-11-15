const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    signOut: '//a[normalize-space()="Sign out"]'
  },

  async clickSignOut() {
    await I.retry(retryCount).click(this.fields.signOut);
  }
};