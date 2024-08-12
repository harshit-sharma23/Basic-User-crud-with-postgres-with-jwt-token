const pool = require('./../config/pg.db.config');

const employeeDetails = async (emp_id) => {
    try {
        const employee_details = await pool.query(
            `select e.emp_id, concat_ws(' ', e.firstname, e.lastname) as fullname, d.department_name, e.email,e.gender, e.mobile, d.category_name,d."location", d.salary from employees e join departments d on e.dept_id=d.dept_id where e.emp_id = $1`,
            [emp_id]
        );
        return employee_details.rows;
    } catch (error) {
        throw new Error('Database query failed');
    }
};

const employeeALLEmpDetails = async (page) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
        const employee_details = await pool.query(
            `select e.emp_id, concat_ws(' ', e.firstname, e.lastname) as fullname, d.department_name, e.email,e.gender, e.mobile, d.category_name,d."location", d.salary from employees e join departments d on e.dept_id=d.dept_id LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        return employee_details.rows;
    } catch (error) {
        throw new Error(`Database query failed ${error}`);
    }
};

const softDeletepDetails = async (emp_id) => {
    const isCurrentEmployee = 0;
    try {
        const result = await pool.query(
            `UPDATE employees
            SET isCurrentEmployee = $1
            WHERE emp_id = $2`,
            [isCurrentEmployee, emp_id]
        );
        if (result.rowCount === 0) {
            return {
                success: false,
                message:
                    'No employee found with the given ID or already soft-deleted.',
            };
        }
        return {
            success: true,
            message: 'Employee soft-deleted successfully.',
        };
    } catch (error) {
        throw new Error(`Database query failed: ${error.message}`);
    }
};

module.exports = { employeeDetails, employeeALLEmpDetails, softDeletepDetails };
