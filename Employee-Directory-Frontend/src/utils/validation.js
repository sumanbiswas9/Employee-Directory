/**
 * Validation Utility
 *
 * This file checks if the employee form data is valid before
 * we send it to the server. Each field has its own rules.
 */

/**
 * Check if a text field is empty.
 * @param {string} value The field value to check.
 * @returns {boolean} True if the field is empty or just whitespace.
 */
const isEmpty = (value) => {
  return !value || value.trim() === "";
};

/**
 * Validate the employee's full name.
 * @param {string} name The name from the form.
 * @returns {string|null} An error message, or null if valid.
 */
const validateName = (name) => {
  if (isEmpty(name)) return "Full Name is required";
  return null;
};

/**
 * Validate the employee's role selection.
 * @param {string} role The role from the form.
 * @returns {string|null} An error message, or null if valid.
 */
const validateRole = (role) => {
  if (!role || role === "Select Role") return "Please select a role";
  return null;
};

/**
 * Validate the employee's department.
 * @param {string} department The department from the form.
 * @returns {string|null} An error message, or null if valid.
 */
const validateDepartment = (department) => {
  if (isEmpty(department)) return "Department is required";
  return null;
};

/**
 * Validate the employee's position.
 * @param {string} position The position from the form.
 * @returns {string|null} An error message, or null if valid.
 */
const validatePosition = (position) => {
  if (isEmpty(position)) return "Position is required";
  return null;
};

/**
 * Validate the employee's email address.
 * @param {string} email The email from the form.
 * @returns {string|null} An error message, or null if valid.
 */
const validateEmail = (email) => {
  if (isEmpty(email)) return "Email is required";
  // Basic email pattern check: "user@example.com"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

/**
 * Validate the employee's phone number.
 * @param {string} phone The phone from the form.
 * @returns {string|null} An error message, or null if valid.
 */
const validatePhone = (phone) => {
  if (isEmpty(phone)) return "Phone number is required";
  // Allows optional +, digits, spaces, and dashes (at least 10 chars)
  if (!/^\+?[\d\s-]{10,}$/.test(phone)) {
    return "Please enter a valid phone number";
  }
  return null;
};

/**
 * Validate all fields in the employee form.
 * @param {Object} data The form values entered by the user.
 * @param {string} data.name The employee's full name.
 * @param {string} data.role The employee's role (Admin, Manager, Employee).
 * @param {string} data.department The employee's department.
 * @param {string} data.position The employee's position/job title.
 * @param {string} data.email The employee's email address.
 * @param {string} data.phone The employee's phone number.
 * @returns {{ isValid: boolean, errors: Object }} An object with isValid flag and any error messages.
 */
export const validateEmployeeForm = (data) => {
  const errors = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const roleError = validateRole(data.role);
  if (roleError) errors.role = roleError;

  const departmentError = validateDepartment(data.department);
  if (departmentError) errors.department = departmentError;

  const positionError = validatePosition(data.position);
  if (positionError) errors.position = positionError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const hasNoErrors = Object.keys(errors).length === 0;

  return {
    isValid: hasNoErrors,
    errors,
  };
};
