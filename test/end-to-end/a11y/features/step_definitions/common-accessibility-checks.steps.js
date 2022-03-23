const { I} = inject();
const CommonPage = require('../../pages/common.page');
//const AnyCcdPage = require('../../pages/any-ccd.page');

Given(/^I go to the sign in page$/, async function () {
    CommonPage.goto();
});

Given(/^I go to "(.+)" tab$/, async function(tab) {
   CommonPage.enterTodo();
})

Then(/^the page is accessible$/, async function () {
    CommonPage.seeNumberOfTodos();
   // await anyCcdPage.runAccessibility();
});
