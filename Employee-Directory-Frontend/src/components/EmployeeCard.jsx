/**
 * EmployeeCard Component
 *
 * This component shows a single employee's information in a nice card layout.
 * It displays their avatar, role, name, position, department, ID, email,
 * phone, and has buttons for "View Profile" and "Edit".
 */

import employeeAvatar from "../assets/employee.svg";
import { PencilLine } from "lucide-react";

/**
 * Display one employee's information as a card.
 * @param {Object} props Component props.
 * @param {Object} props.employee The employee data to display.
 * @param {Function} props.onEditEmployee Function to call when the Edit button is clicked.
 */
export default function EmployeeCard({ employee, onEditEmployee }) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm shadow-slate-200/60 transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/60 sm:p-8">
      <div className="flex justify-center">
        <img
          src={employeeAvatar}
          alt="employee"
          className="h-20 w-20 rounded-full border border-slate-200 bg-slate-50 object-cover p-2 sm:h-28 sm:w-28"
        />
      </div>

      <div className="mt-5">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-gray-700">
          {employee.role}
        </span>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-slate-900 sm:text-2xl">
        {employee.name}
      </h2>

      <p className="mt-2 text-sm text-slate-500">{employee.position}</p>

      <div className="mt-6 flex justify-center gap-4 sm:mt-8 sm:gap-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Department
          </p>
          <p className="mt-1 text-sm font-medium text-slate-800 sm:text-base">
            {employee.department}
          </p>
        </div>

        <div className="h-12 w-px bg-slate-200"></div>

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">ID</p>
          <p className="mt-1 text-sm font-medium text-slate-800 sm:text-base">
            {employee.id}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-1">
        <p className="truncate text-xs text-slate-600 sm:text-sm">{employee.email}</p>
        <p className="text-xs text-slate-600 sm:text-sm">{employee.phone}</p>
      </div>

      <div className="mt-auto flex flex-wrap justify-center gap-2 pt-6 sm:gap-3 sm:pt-8">
        <button className="rounded-xl border border-slate-200 px-5 py-2 text-slate-600 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white">
          View Profile
        </button>

        <button
          type="button"
          onClick={() => onEditEmployee(employee)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2 text-slate-600 transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-white"
        >
          <PencilLine size={16} />
          Edit
        </button>
      </div>
    </div>
  );
}
