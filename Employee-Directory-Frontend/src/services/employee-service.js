/**
 * Employee Service
 *
 * This file has all the API functions for talking to the backend.
 * Each function calls a different endpoint on our server to get,
 * create, update, search, or filter employee data.
 */

const BASE_URL = import.meta?.env?.VITE_BASE_URL || "http://localhost:8080/api/employees";

/**
 * Get all employees from the API.
 * @returns {Promise<Object[]>} A list of all employees from the database.
 */
export const getEmployees = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const employeeList = await response.json();
  return employeeList;
};

/**
 * Get a single employee by their ID.
 * @param {number|string} id The ID of the employee we want to find.
 * @returns {Promise<Object>} The employee data that matches the given ID.
 */
export const getEmployeeById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }

  const employee = await response.json();
  return employee;
};

/**
 * Search employees by a keyword (like their name).
 * @param {string} keyword The search term entered by the user.
 * @returns {Promise<Object[]>} A list of employees that match the keyword.
 */
export const searchEmployees = async (keyword) => {
  const response = await fetch(
    `${BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search employees");
  }

  const matchingEmployees = await response.json();
  return matchingEmployees;
};

/**
 * Filter employees by department, role, or position.
 * @param {Object} filters The filter options selected by the user.
 * @param {string} [filters.department] Filter by department name.
 * @param {string} [filters.role] Filter by role (Admin, Manager, Employee).
 * @param {string} [filters.position] Filter by job position.
 * @returns {Promise<Object[]>} A list of employees that match the filters.
 */
export const filterEmployees = async ({
  department,
  role,
  position,
}) => {
  const params = new URLSearchParams();

  if (department) params.append("department", department);
  if (role) params.append("role", role);
  if (position) params.append("position", position);

  const response = await fetch(
    `${BASE_URL}/filter?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to filter employees");
  }

  const filteredEmployees = await response.json();
  return filteredEmployees;
};

/**
 * Create a new employee by sending their data to the API.
 * @param {Object} employeeData The new employee's information from the form.
 * @returns {Promise<Object>} The newly created employee (with an ID from the server).
 */
export const createEmployee = async (employeeData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    throw new Error("Failed to create employee");
  }

  const createdEmployee = await response.json();
  return createdEmployee;
};

/**
 * Update an existing employee's information.
 * @param {number|string} id The ID of the employee we want to update.
 * @param {Object} employeeData The updated information from the form.
 * @returns {Promise<Object>} The updated employee data from the server.
 */
export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  const updatedEmployee = await response.json();
  return updatedEmployee;
};