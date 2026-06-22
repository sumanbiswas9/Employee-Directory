/**
 * EmployeeForm Component
 *
 * This is a modal form that lets users add a new employee or edit
 * an existing one. It has fields for name, role, department, position,
 * email, and phone. The form validates all fields before submitting.
 *
 * It works in two modes:
 * - "add" mode: All fields start empty so the user can enter new data
 * - "edit" mode: Fields are pre-filled with the existing employee's data
 */

import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { validateEmployeeForm } from "../utils/validation";

const emptyEmployee = {
  name: "",
  role: "",
  department: "",
  position: "",
  email: "",
  phone: "",
};

/**
 * Render the employee add/edit form.
 * @param {Object} props Component props.
 * @param {string} [props.mode="add"] Whether the form is in "add" or "edit" mode.
 * @param {Object|null} props.employee The employee data to edit (null when adding).
 * @param {Function} props.onClose Function to call when the form should be closed.
 * @param {Function} props.onSubmit Function to call with the form data when submitted.
 */
function EmployeeForm({ mode = "add", employee, onClose, onSubmit }) {
  const [formValues, setFormValues] = useState(emptyEmployee);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormValues({
        name: employee.name ?? "",
        role: employee.role ?? "",
        department: employee.department ?? "",
        position: employee.position ?? "",
        email: employee.email ?? "",
        phone: employee.phone ?? "",
      });
      return;
    }

    setFormValues(emptyEmployee);
    setErrors({});
  }, [employee, mode]);

  /**
   * Handle changes to any form field.
   * @param {Event} event The input change event.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: undefined,
      }));
    }
  };

  /**
   * Handle form submission — validate first, then submit if valid.
   * @param {Event} event The form submit event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const { isValid, errors: validationErrors } = validateEmployeeForm(formValues);

    if (isValid) {
      onSubmit(formValues);
    } else {
      setErrors(validationErrors);
    }
  };

  const title = mode === "edit" ? "Edit Employee" : "Add Employee";
  const submitLabel = mode === "edit" ? "Update Employee" : "Add Employee";

  return (
    <div className="relative mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/20 sm:rounded-3xl sm:p-6 md:p-8">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        aria-label="Close dialog"
      >
        <X size={20} />
      </button>

      {/* pr-10 prevents title from overlapping with the close button on small screens */}
      <h2 className="mb-5 pr-10 text-center text-xl font-semibold text-slate-800 sm:mb-8 sm:pr-0 sm:text-3xl">
        {title}
      </h2>

      <form className="grid gap-4 sm:gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Enter employee name"
            value={formValues.name}
            onChange={handleChange}
            className={`w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-slate-300'} px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Role
          </label>
          <select
            name="role"
            value={formValues.role}
            onChange={handleChange}
            className={`w-full rounded-xl border ${errors.role ? 'border-red-500' : 'border-slate-300'} px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          >
            <option>Select Role</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>Employee</option>
          </select>
          {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Department
          </label>
          <div className="relative">
            <select
              name="department"
              value={formValues.department}
              onChange={handleChange}
              className={`w-full appearance-none rounded-xl border ${errors.department ? 'border-red-500' : 'border-slate-300'} px-4 py-3 pr-10 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
            >
              <option value="">Select Department</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Design">Design</option>
              <option value="Support">Support</option>
              <option value="IT">IT</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
          {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Position
          </label>
          <div className="relative">
            <select
              name="position"
              value={formValues.position}
              onChange={handleChange}
              className={`w-full appearance-none rounded-xl border ${errors.position ? 'border-red-500' : 'border-slate-300'} px-4 py-3 pr-10 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
            >
              <option value="">Select Position</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Marketing Executive">Marketing Executive</option>
              <option value="Financial Analyst">Financial Analyst</option>
              <option value="Operations Manager">Operations Manager</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Customer Support Executive">Customer Support Executive</option>
              <option value="System Administrator">System Administrator</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
          {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            value={formValues.email}
            onChange={handleChange}
            className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-slate-300'} px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Phone
          </label>
          <input
            name="phone"
            type="text"
            placeholder="Enter phone number"
            value={formValues.phone}
            onChange={handleChange}
            className={`w-full rounded-xl border ${errors.phone ? 'border-red-500' : 'border-slate-300'} px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4 md:col-span-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-300 px-6 py-3 text-slate-600 transition-all duration-300 hover:bg-slate-100 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full rounded-xl border border-slate-200 px-6 py-3 text-slate-600 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white sm:w-auto"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
