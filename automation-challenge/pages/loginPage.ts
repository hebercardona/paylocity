import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly USERNAME: Locator;
    private readonly PASSWORD: Locator;
    private readonly LOGIN_BTN: Locator;

    constructor(page: Page) {
        this.page = page;
        this.USERNAME = this.page.locator(`#Username`);
        this.PASSWORD = this.page.locator(`#Password`);
        this.LOGIN_BTN = this.page.locator(`button[type='submit']`);
    }

    async enterUserName(username: string): Promise<void> {
        await this.USERNAME.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.PASSWORD.fill(password);
    }

    async clickLogInBtn(): Promise<void> {
        await this.LOGIN_BTN.click();
    }

    async loginAsTestUser(user: string, password: string): Promise<void> {
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLogInBtn();
    }
}