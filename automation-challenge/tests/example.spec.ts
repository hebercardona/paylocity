import { test, expect } from '../fixtures/base';
import { Employee } from '../pages/benefitsDashboarPage';

let employee: number = 0;

test('Verify user can login', async ({ loginPage, benefitsDashboardPage }) => {
  let newEmployee;
  let existingEmployeeCount: number;
  await test.step(`Log In to benefits dashboard`, async() =>{
    await loginPage.loginAsTestUser('TestUser448', `@h]d7r_w'2Vm`);
  });
  await test.step(`Add new Employee`, async() =>{
    existingEmployeeCount = await benefitsDashboardPage.getEmployeeRows();
    await benefitsDashboardPage.addNewEmployee('Auto', 'Employee'+ ++employee, '2');
  });
  await test.step(`Verify new employee is added to the list`, async() =>{
    const currentEmployeeList = await benefitsDashboardPage.getEmployeeRows();
    expect(currentEmployeeList, `No new employee record was inserted in the employee list`).toBeGreaterThan(existingEmployeeCount);
  });
  await test.step(`Get the newly created employee`, async() =>{
    newEmployee = await benefitsDashboardPage.getEmployeeByDetails('Auto', 'Employee'+ employee, '2');
    expect(newEmployee, `No new employee was found with given details`).toBeTruthy();
  });
  await test.step(`Verify new employee salary`, async() =>{
    expect(newEmployee.salary).toEqual('2000')
  });

});

test.afterEach('Delete created employee', async({ benefitsDashboardPage }) =>{
  await benefitsDashboardPage.deleteAllEmployees();
});
