/**
 * EmployeeList Component
 *
 * This component takes in a list of employees and renders
 * each one as a card inside a responsive grid layout.
 */

import EmployeeCard from "./EmployeeCard";

/**
 * Display a grid of employee cards.
 * @param {Object} props Component props.
 * @param {Object[]} props.employees The array of employee objects to display.
 * @param {Function} props.onEditEmployee Function to call when an employee's Edit button is clicked.
 */
function EmployeeList({ employees, onEditEmployee }) {
  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEditEmployee={onEditEmployee}
        />
      ))}
    </div>
  );
}

export default EmployeeList;
