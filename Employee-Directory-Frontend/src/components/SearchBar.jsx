import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

/**
 * SearchBar component
 *
 * This component gives the user three simple ways to work with the employee list:
 * - type a name to search
 * - choose a role to filter
 * - click the button to add a new employee
 *
 * @param {Object} props Component props.
 * @param {Function} [props.onAddEmployee] Called when the user clicks the add button.
 * @param {Function} [props.onSearch] Called after the user stops typing for a short time.
 * @param {Function} [props.onFilter] Called when the user selects a role from the dropdown.
 */
function SearchBar({ onAddEmployee, onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Debounce the search — waits 300ms after the user stops typing
   * before calling onSearch, to avoid calling it on every keystroke.
   */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (onSearch) onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60 lg:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative min-w-0 w-full lg:max-w-md">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search employee by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
          <label className="text-sm font-medium text-slate-500">Filter:</label>

          <div className="relative w-full sm:w-auto">
            <select
              onChange={(e) => onFilter && onFilter(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none transition focus:border-blue-500 focus:bg-white sm:w-auto"
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
          </div>

          <div className="hidden h-10 w-px bg-slate-200 md:block"></div>

          <button
            type="button"
            onClick={onAddEmployee}
            className="w-full rounded-xl border border-slate-200 px-6 py-3 text-slate-600 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white sm:w-auto"
          >
            + Add People
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
