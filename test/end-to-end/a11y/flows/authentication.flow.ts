import { browser } from 'protractor';
import { IdamSignInPage } from '../pages/idam-sign-in.page';

const serviceConfig = require('../service.conf');

export class AuthenticationFlow {

    private idamSignInPage = new IdamSignInPage();

    async signInAsCaseOfficer() {
        await this.signOut();
        await this.idamSignInPage.waitUntilLoaded();
        await this.idamSignInPage.signIn(
            serviceConfig.TestCaseOfficerUserName,
            serviceConfig.TestCaseOfficerPassword
        );
    }

    async signOut() {
        await browser.waitForAngularEnabled(false);
        await browser.driver.manage().deleteAllCookies();
        await browser.get(serviceConfig.CcdGatewayUrl + '/logout');
        await browser.get(serviceConfig.CcdWebUrl + '/');
        await this.idamSignInPage.waitUntilLoaded();
    }

    async signInAsDWPResponseWriter() {
        await this.signOut();
        await this.idamSignInPage.waitUntilLoaded();
        await this.idamSignInPage.signIn(
            serviceConfig.TestDWPResponseWriterUserName,
            serviceConfig.TestDWPResponseWriterPassword
        );
    }

    async signInAsClerk() {
        await this.signOut();
        await this.idamSignInPage.waitUntilLoaded();
        await this.idamSignInPage.signIn(
            serviceConfig.TestClerkUserName,
            serviceConfig.TestClerkPassword
        );
    }

    async signInAsJudge() {
        await this.signOut();
        await this.idamSignInPage.waitUntilLoaded();
        await this.idamSignInPage.signIn(
            serviceConfig.TestJudgeUserName,
            serviceConfig.TestJudgePassword
        );
    }

    async goToSignInPage() {
        await this.signOut();
        await this.idamSignInPage.waitUntilLoaded();
    }
}
