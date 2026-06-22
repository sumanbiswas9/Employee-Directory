/**
 * EmployeePage Component
 *
 * This is the main page of the application. It handles:
 * - Fetching all employees from the API when the page loads
 * - Searching employees by name
 * - Filtering employees by role
 * - Adding a new employee
 * - Editing an existing employee
 * - Showing success toast notifications
 * - Displaying loading, error, and empty states
 *
 * All state management happens here. Child components just receive
 * data and callback functions through props.
 */

import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";
import Toast from "../components/Toast";
import { getEmployees, createEmployee, updateEmployee, searchEmployees, filterEmployees } from "../services/employee-service";

/**
 * Render the main employee directory page.
 * This component owns all the state and passes it down to children.
 */
function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [formState, setFormState] = useState({
    isOpen: false,
    mode: "add",
    employee: null,
  });

  /**
   * Fetch all employees from the API and update the list.
   * Called on page load and when search/filter is cleared.
   */
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployees();
      setEmployees(data || []);
    } catch (err) {
      setError(err.message || "An error occurred while fetching employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /**
   * Search employees by name using the search API.
   * If the search box is empty, load all employees instead.
   * @param {string} keyword What the user typed in the search box.
   */
  const handleSearch = async (keyword) => {
    if (!keyword || keyword.trim() === "") {
      fetchEmployees();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchEmployees(keyword);
      setEmployees(data || []);
    } catch (err) {
      setError(err.message || "Failed to search employees");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filter employees by role using the filter API.
   * If "All Roles" is selected (empty value), load all employees instead.
   * @param {string} role The role to filter by (Admin, Manager, Employee).
   */
  const handleFilter = async (role) => {
    if (!role || role === "") {
      fetchEmployees();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await filterEmployees({ role });
      setEmployees(data || []);
    } catch (err) {
      setError(err.message || "Failed to filter employees");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Open the form in "add" mode to create a new employee.
   */
  const openAddForm = () => {
    setFormState({ isOpen: true, mode: "add", employee: null });
  };

  /**
   * Open the form in "edit" mode with the selected employee's data.
   * @param {Object} employee The employee to edit.
   */
  const openEditForm = (employee) => {
    setFormState({ isOpen: true, mode: "edit", employee });
  };

  /**
   * Close the form modal without saving.
   */
  const closeForm = () => {
    setFormState((currentState) => ({
      ...currentState,
      isOpen: false,
    }));
  };

  /**
   * Update an existing employee in the list.
   * @param {Object} employeeData The updated employee data from the form.
   */
  const handleUpdateEmployee = async (employeeData) => {
    const updated = await updateEmployee(formState.employee.id, employeeData);

    setEmployees((currentEmployees) =>
      currentEmployees.map((emp) =>
        emp.id === updated.id ? updated : emp
      )
    );

    setToastMessage("Employee updated successfully!");
  };

  /**
   * Add a new employee to the beginning of the list.
   * @param {Object} employeeData The new employee data from the form.
   */
  const handleAddEmployee = async (employeeData) => {
    const created = await createEmployee(employeeData);
    setEmployees((currentEmployees) => [created, ...currentEmployees]);
    setToastMessage("Employee added successfully!");
  };

  /**
   * Save employee data — creates or updates based on the current form mode.
   * @param {Object} employeeData The form data entered by the user.
   */
  const handleSaveEmployee = async (employeeData) => {
    try {
      if (formState.mode === "edit" && formState.employee) {
        await handleUpdateEmployee(employeeData);
      } else {
        await handleAddEmployee(employeeData);
      }

      closeForm();
    } catch (err) {
      console.error("Failed to save employee:", err);
      alert("Failed to save employee: " + err.message);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:gap-8 sm:px-6 lg:px-8 lg:py-12">
      <header className="space-y-3 text-center lg:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Directory
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Employee Dashboard
        </h1>
      </header>

      <SearchBar
        onAddEmployee={openAddForm}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-lg text-slate-500">Loading employees...</p>
        </div>
      ) : error ? (
        <div className="flex h-64 flex-col items-center justify-center gap-4 text-red-500">
          <p className="text-lg font-medium">{error}</p>
          <button
            onClick={fetchEmployees}
            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
          >
            Try Again
          </button>
        </div>
      ) : employees.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-lg text-slate-500">No employees found.</p>
        </div>
      ) : (
        <EmployeeList employees={employees} onEditEmployee={openEditForm} />
      )}

      {formState.isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/60 px-3 py-4 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
          onClick={closeForm}
        >
          <div
            className="w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <EmployeeForm
              mode={formState.mode}
              employee={formState.employee}
              onClose={closeForm}
              onSubmit={handleSaveEmployee}
            />
          </div>
        </div>
      ) : null}

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />
    </div>
  );
}

export default EmployeePage;
