const jwt = require('jsonwebtoken');
const pool = require('./../config/pg.db.config');
const { hashPassword, verifyPassword } = require('./../config/bcrypt.config');
const { secreteToken } = require('../config/env.config');

const findUserByEmail = async (email) => {
    try {
        const result = await pool.query(
            'SELECT * FROM employees WHERE email = $1',
            [email]
        );
        if (result.rowCount === 1) {
            return result.rows[0];
        }
        return null;
    } catch (error) {
        console.error('error:', error);
        throw new Error('Error querying user by email');
    }
};

const registration = async (...employee_details) => {
    const [firstName, lastName, gender, hobbies, mobile, email, password] =
        employee_details;
    try {
        const hashedPassword = await hashPassword(password, 10);

        const result = await pool.query(
            `INSERT INTO employees(firstName, lastName, gender, hobbies, mobile,email, password) VALUES ($1, $2, $3, $4, $5,$6, $7)`,
            [
                firstName,
                lastName,
                gender,
                hobbies,
                mobile,
                email,
                hashedPassword,
            ]
        );
        if (result.rowCount === 1) {
            return result.rows[0];
        } else {
            throw new Error('User registration failed.');
        }
    } catch (error) {
        console.error('error:', error);
        throw new Error('Error querying user by email');
    }
};

const login = async (email, password) => {
    try {
        const userDetails = await findUserByEmail(email);
        if (!userDetails) {
            throw new Error('User credentials are wrong.');
        }

        const validPassword = await verifyPassword(
            password,
            userDetails.password
        );

        if (!validPassword) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            {
                userId: userDetails.emp_id,
                email: userDetails.email,
                role: userDetails.role,
            },
            secreteToken,
            {
                expiresIn: '1h',
            }
        );

        return token;
    } catch (error) {
        console.error('error:', error);
        throw new Error('Internal server error');
    }
};

module.exports = { findUserByEmail, registration, login };
