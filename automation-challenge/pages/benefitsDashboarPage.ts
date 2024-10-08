import { Locator, Page } from '@playwright/test';

export type Employee = {
    id: string,
    lastName: string,
    firstName: string,
    dependents: string,
    salary: string,
    grossPay: string,
    benefitsCost: string,
    netPay: string,
    update: Locator,
    delete: Locator
}

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
    private readonly EMPLOYEE_ROWS: Locator;
    private readonly CONFIRM_DELETE_BTN: Locator;
    private readonly DELETE_MODAL: Locator;
    private readonly EMPLOYEE_DELETE: Locator;

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
        this.EMPLOYEE_ROWS = this.page.locator(`table[id='employeesTable'] tbody tr`);
        this.CONFIRM_DELETE_BTN = this.page.locator(`#deleteEmployee`);
        this.DELETE_MODAL = this.page.locator(`#deleteModal`);
        this.EMPLOYEE_DELETE = this.page.locator(`i[class*='fa-times']`);
    }

    async clickDashboardAddBtn(): Promise<void> {
        await this.page.waitForTimeout(2000);
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

    async getEmployeeRows(): Promise<number> {
        await this.EMPLOYEES_TABLE.waitFor({state: 'visible'});
        if(await this.EMPLOYEE_ROWS.count() === 1 && (await this.EMPLOYEE_ROWS.first().locator('td').first().innerText()).includes('No employees found')) {
            return 0;
        } else {
            return await this.EMPLOYEE_ROWS.count() ? await this.EMPLOYEE_ROWS.count() : 0;
        }
    }

    async getEmployeesList(): Promise<Employee[]> {
        const employeeList: Employee[] = [];
        for (const employee of await this.EMPLOYEE_ROWS.all()) {
            const emp: Employee = {
                id: await employee.locator(`td:nth-child(1)`).innerText(),
                lastName: await employee.locator(`td:nth-child(2)`).innerText(),
                firstName: await employee.locator(`td:nth-child(3)`).innerText(),
                dependents: await employee.locator(`td:nth-child(4)`).innerText(),
                salary: await employee.locator(`td:nth-child(5)`).innerText(),
                grossPay: await employee.locator(`td:nth-child(6)`).innerText(),
                benefitsCost: await employee.locator(`td:nth-child(7)`).innerText(),
                netPay: await employee.locator(`td:nth-child(8)`).innerText(),
                update: employee.locator(`td:nth-child(9) i[class*='fa-edit']`),
                delete: employee.locator(`td:nth-child(9) i[class*='fa-times']`)
            }
            employeeList.push(emp);
        }
        return employeeList;
    }

    async getEmployeeByDetails(firstName: string, lastName: string, dependents: string): Promise<Employee | undefined> {
        const employees = await this.getEmployeesList();
        for (const employee of employees) {
            if(employee.firstName === firstName && employee.lastName === lastName && employee.dependents === dependents)
                return employee;
        }
        return undefined;
    }

    async clickConfirmDeleteBtn(): Promise<void> {
        await this.DELETE_MODAL.waitFor({state: 'visible'});
        await this.CONFIRM_DELETE_BTN.click();
        await this.DELETE_MODAL.waitFor({state: 'hidden'});
    }

    async deleteAllEmployees(): Promise<void> {
        for (const employee of await this.EMPLOYEE_DELETE.all()) {
            await this.EMPLOYEE_DELETE.first().click();
            await this.clickConfirmDeleteBtn();
            await this.page.waitForTimeout(1000);
        }
    }

}