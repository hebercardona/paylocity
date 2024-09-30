import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { BenefitsDashboardPage } from '../pages/benefitsDashboarPage';

type Fixtures = {
    loginPage: LoginPage;
    benefitsDashboardPage: BenefitsDashboardPage;
}

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login');
        await use(loginPage);
    },

    benefitsDashboardPage: async({ page }, use) => {
        const benefitsDashboardPage = new BenefitsDashboardPage(page);
        await use(benefitsDashboardPage);
    }
});

export { expect } from '@playwright/test';