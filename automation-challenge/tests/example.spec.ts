import { test, expect } from '../fixtures/base';

test('Verify user can login', async ({ loginPage, benefitsDashboardPage }) => {
  await test.step(`Log In to benefits dashboard`, async() =>{
    await loginPage.loginAsTestUser('TestUser448', `@h]d7r_w'2Vm`);
  });
  await test.step(`Get Employees`, async() =>{
    const employees = await benefitsDashboardPage.getEmployeesList();
  });
  await test.step(`Add new Employee`, async() =>{
    await benefitsDashboardPage.addNewEmployee('Auto', 'Employee', '2');
  });

});
