import { AnyCcdPage } from '../../pages/any-ccd.page';
import { Given, Then } from 'cucumber';
import { AuthenticationFlow } from '../../flows/authentication.flow';
import { browser } from 'protractor';

const authenticationFlow = new AuthenticationFlow();

const anyCcdPage = new AnyCcdPage();

Given(/^I go to the sign in page$/, async function () {
    await authenticationFlow.goToSignInPage();
    await anyCcdPage.pageHeadingContains('Sign in')
});

Given(/^I go to "(.+)" tab$/, async function(tab) {
    await anyCcdPage.clickTab(tab);
    await browser.sleep(500);
})

Then(/^the page is accessible$/, async function () {
    await anyCcdPage.runAccessibility();
});
