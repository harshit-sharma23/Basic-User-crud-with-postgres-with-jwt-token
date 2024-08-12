const {
    employeeDetails,
    employeeALLEmpDetails,
    softDeletepDetails,
} = require('./../service/employees.service');

const FindAEmployeeDetails = async (req, res) => {
    const { userId } = req.user;
    try {
        const employee_details = await employeeDetails(userId);
        if (employee_details.length == 0)
            return res.status(200).json({
                message: 'Employee Details Not Found!!',
            });
        return res.status(200).json({
            message: 'Employee Details Fetched Sucessfully!!',
            data: employee_details,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const FindAllEmployeeDetails = async (req, res) => {
    const { page } = req.query;
    try {
        const employee_details = await employeeALLEmpDetails(page);
        if (employee_details.length == 0)
            return res.status(200).json({
                message: 'Employee Details Not Found!!',
            });
        return res.status(200).json({
            message: 'Employees Details Fetched Sucessfully!!',
            data: employee_details,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const handleSoftDelete = async (req, res) => {
    const { emp_id } = req.params;
    try {
        const result = await softDeletepDetails(emp_id);
        if (result.success) {
            return res.status(200).json({ message: result.message });
        } else {
            return res.status(404).json({ message: result.message });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    fetchEmployeeDetails: FindAEmployeeDetails,
    fetchAllEmployeesDetails: FindAllEmployeeDetails,
    employeeSoftDelete: handleSoftDelete,
};
