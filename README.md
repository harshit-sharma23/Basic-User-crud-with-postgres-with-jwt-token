## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Environment Variables](#environment-variables)
-   [Project Database Queries](#database-queries)
-   [Author](#author)
-   [License](#license)

## Installation

## Instructions on how to install and set up your project. For example:

```bash
git clone https://github.com/your-account/repository.git
cd repository
npm install

## Usage
## Instructions on how to run the project, including any necessary commands. For example:

# Environment Variables
# This project requires certain environment variables to be set. You can configure them in a .env file. Here's a sample .env:
- **PORT=3000
- **DB_USER='your_database_username'
- **DB_HOST='your_database_host'
- **DB_NAME='your_database_name'
- **DB_PASSWORD='your_database_password'
- ** DB_PORT=5432

## database-queries-with-postgres
-- **CREATE DATABASE** --
CREATE DATABASE ipangram_db;

-- **CREATE TABLES AND UPDATES** --
create table employees(emp_id serial primary key, firstName varchar(50) not null, lastname varchar(50) not null, gender varchar(6) not null, hobbies varchar(100) not null, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);
ALTER TABLE employees ADD column email varchar(50) NOT NULL;
ALTER TABLE employees ADD column mobile varchar(10) NOT NULL;
ALTER TABLE employees ADD column dept_id integer;
ALTER TABLE employees ADD column password varchar(20);
ALTER TABLE employees ADD UNIQUE (email);
ALTER TABLE employees ADD column role int DEFAULT 1;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,                   -- Unique identifier for each department
    department_name VARCHAR(255) NOT NULL,   -- Name of the department
    category_name VARCHAR(255) NOT NULL,     -- Category of the department
    location VARCHAR(255),                   -- Location of the department
    salary DECIMAL(10, 2),                   -- Salary associated with the department
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Record creation timestamp
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Last update timestamp
  )

ALTER TABLE departments RENAME COLUMN id TO dept_id;
ALTER TABLE employees ADD CONSTRAINT fk_dept_id FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL ON UPDATE CASCADE;

## fetched Details By department Id
SELECT * FROM departments d left join employees e on d.dept_id= e.dept_id where d.dept_id = $1 ORDER BY d.dept_id LIMIT $2 OFFSET $3SELECT d.dept_id ,e.emp_id,concat_ws(' ',e.firstname,e.lastname) as employee_name,  e.gender,e.email, e.mobile, d.category_name, d."location",d.salary FROM departments d join employees e on d.dept_id= e.dept_id where d.dept_id = $1 ORDER BY d.dept_id LIMIT $2 OFFSET $3"

## Random JWT SECRETE TOKEN
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

## Author
Author Harshit Sharma - GitHub Profile
Email: info.harshit37@gmail.com
LinkedIn: www.linkedin.com/in/harshit-sharma23
License
This project is licensed under the MIT License - see the LICENSE file for details.


### Key Sections Explained:

- **Project Name**: The name of your project.
- **Description**: A short description of what your project does.
- **Table of Contents**: Helps users navigate through the README file.
- **Installation**: Step-by-step guide on how to install and set up the project.
- **Usage**: Instructions on how to use the project after setup.
- **Environment Variables**: Details the required environment variables and how to configure them.
- **Author**: Includes your name, GitHub profile, email, and LinkedIn profile for attribution and contact.
- **License**: Specifies the license under which the project is distributed.

```
