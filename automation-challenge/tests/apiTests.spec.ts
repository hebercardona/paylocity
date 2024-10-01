import { expect } from "@playwright/test";
import test from "@playwright/test";

type Employee = {
    id: string,
    firstName: string,
    lastName: string,
    dependants: string,
    salary: number,
    gross: number,
    benefitsCost: number,
    net: number
}

test('Add employee, get employee list and verify employee added is present. Delete newly added employee and verify employee list @apiTest', async({ request }) => {
    let newEmployee = {
        firstName: 'Auto',
        lastName: 'Employee' + new Date().getMilliseconds().toString(),
        dependants: '4'
    }

    //Add employee
    const addEmployeeRequest = await request.post(`/Prod/api/employees`, {
        data: {
            firstName: newEmployee.firstName,
            lastName: newEmployee.lastName,
            dependants: newEmployee.dependants
        }
    });
    expect(addEmployeeRequest.ok()).toBeTruthy();

    //Get List of employees
    const employeeList = await request.get(`/Prod/api/employees`);
    const employees: Employee[] = await JSON.parse(await employeeList.text());

    //Parse list of employees and verufy newly added employee is present
    const employeeFound = employees.find(x => x.lastName === newEmployee.lastName);
    expect(employeeFound).toBeTruthy();

    //Delete All employees
    for (const employee of employees) {
        const deleteEmployeesREquest = await request.delete(`Prod/api/employees/${employee.id}`);
        expect(deleteEmployeesREquest.ok()).toBeTruthy();
    }

    //Get employee list and verify no objects are returned
    const newEmployeeList = await request.get(`/Prod/api/employees`);
    const newEmployees: Employee[] = await JSON.parse(await newEmployeeList.text());
    expect(newEmployees.length).toEqual(0);
});