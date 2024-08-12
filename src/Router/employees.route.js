const express = require('express');
const employee = require('./../controller/employees.controller');

const app = express();

app.get('/get-employee-details', employee.fetchEmployeeDetails);
app.get('/get-all-employee-details', employee.fetchAllEmployeesDetails);
app.patch('/employee-soft-delete', employee.fetchAllEmployeesDetails);

module.exports = app;
