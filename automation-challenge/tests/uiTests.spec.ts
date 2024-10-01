import { test, expect } from '../fixtures/base';
import { Employee } from '../pages/benefitsDashboarPage';

let employee: number = 0;

test('Verify employee can be added and employee details are as expected @uiTest', async ({ loginPage, benefitsDashboardPage }) => {
  let newEmployee: Employee;
  let existingEmployeeCount: number;
  let employeeToAdd = {
    firstName: 'Auto',
    lastName: 'Employee' + ++employee,
    dependents: '2'
  }
  await test.step(`Log In to benefits dashboard`, async() =>{
    await loginPage.loginAsTestUser('TestUser448', `@h]d7r_w'2Vm`);
  });
  await test.step(`Add new Employee`, async() =>{
    existingEmployeeCount = await benefitsDashboardPage.getEmployeeRows();
    await benefitsDashboardPage.addNewEmployee(employeeToAdd.firstName, employeeToAdd.lastName, employeeToAdd.dependents);
  });
  await test.step(`Verify new employee is added to the list`, async() =>{
    const currentEmployeeList = await benefitsDashboardPage.getEmployeeRows();
    expect(currentEmployeeList, `No new employee record was inserted in the employee list`).toBeGreaterThan(existingEmployeeCount);
  });
  await test.step(`Get the newly created employee`, async() =>{
    const employees = await benefitsDashboardPage.getEmployeesList();
    newEmployee = employees[0];
    expect(newEmployee, `No new employee was found`).toBeTruthy();
  });
  await test.step(`Verify new employee details are as expected`, async() =>{
    expect.soft(newEmployee.grossPay, `Gross pay does not match expected amount`).toEqual('2000.00');
    expect.soft(newEmployee.firstName, `New Employee first name does not match given value`).toEqual(employeeToAdd.firstName);
    expect.soft(newEmployee.lastName, `New Employee last name does not match given value`).toEqual(employeeToAdd.lastName);
    expect.soft(newEmployee.dependents, `New Employee dependents does not match given value`).toEqual(employeeToAdd.dependents)
  });

});

test.afterEach('Delete created employee', async({ benefitsDashboardPage }) =>{
  await benefitsDashboardPage.deleteAllEmployees();
});
