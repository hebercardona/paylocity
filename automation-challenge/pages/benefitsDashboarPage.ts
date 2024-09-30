import { Locator, Page } from '@playwright/test';

export class BenefitsDashboardPage {
    private readonly page: Page;
    private readonly ADD_BUTTON: Locator;
    private readonly MODAL_EMPLOYEE_FIRST_NAME: Locator;
    private readonly MODAL_EMPLOYEE_LAST_NAME: Locator;
    private readonly MODAL_DEPENDENTS: Locator;
    private readonly MODAL_ADD_BTN: Locator;
    private readonly MODAL_CANCEL_BTN: Locator;
    private readonly EMPLOYEES_TABLE: Locator;
    private readonly EMPLOYEE_MODAL: Locator;

    constructor(page: Page) {
        this.page = page;

        this.ADD_BUTTON = this.page.locator(`#add`);
        this.MODAL_EMPLOYEE_FIRST_NAME = this.page.locator(`#firstName`);
        this.MODAL_EMPLOYEE_LAST_NAME = this.page.locator(`#lastName`);
        this.MODAL_DEPENDENTS = this.page.locator(`#dependants`);
        this.MODAL_ADD_BTN = this.page.locator(`#addEmployee`);
        this.MODAL_CANCEL_BTN = this.page.locator(`button[class*=btn-secondary]`);
        this.EMPLOYEES_TABLE = this.page.locator(`#employeesTable`);
        this.EMPLOYEE_MODAL = this.page.locator(`#employeeModal`);
    }

    async clickDashboardAddBtn(): Promise<void> {
        await this.EMPLOYEES_TABLE.waitFor({state: 'visible'});
        await this.ADD_BUTTON.waitFor({state: 'visible'});
        await this.ADD_BUTTON.click();
        await this.EMPLOYEE_MODAL.waitFor({state: 'visible'});
    }

    async enterFirstName(firstname: string): Promise<void> {
        await this.MODAL_EMPLOYEE_FIRST_NAME.fill(firstname);
    }

    async enterLastName(lastname: string): Promise<void> {
        await this.MODAL_EMPLOYEE_LAST_NAME.fill(lastname);
    }

    async enterDependents(dependents: string): Promise<void> {
        await this.MODAL_DEPENDENTS.fill(dependents);
    }

    async clickModalAddBtn(): Promise<void> {
        await this.MODAL_ADD_BTN.click();
        await this.MODAL_ADD_BTN.waitFor({state: 'hidden'});
    }

    async clickModalCancelButton(): Promise<void> {
        await this.MODAL_CANCEL_BTN.click();
    }

    async addNewEmployee(firstName: string, lastName: string, dependents: string): Promise<void> {
        await this.clickDashboardAddBtn();  
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterDependents(dependents);
        await this.clickModalAddBtn();
        await this.page.waitForTimeout(10000);
    }

}