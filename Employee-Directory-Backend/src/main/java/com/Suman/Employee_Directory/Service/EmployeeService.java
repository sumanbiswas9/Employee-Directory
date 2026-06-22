package com.Suman.Employee_Directory.Service;

import com.Suman.Employee_Directory.DTO.EmployeesDTO;
import com.Suman.Employee_Directory.Entity.Employee;
import com.Suman.Employee_Directory.Repository.EmployeeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    private EmployeeRepository employeeRepository;

    /**
     * This is the constructor for EmployeeService
     * @param employeeRepository - The repository we need to use
     */
    public EmployeeService(EmployeeRepository employeeRepository) {
        // setting the repository so we can use it later
        this.employeeRepository = employeeRepository;
    }

    /**
     * Gets all the employees from the database
     * @return A list of all employees in DTO format
     */
    public List<EmployeesDTO> getAllEmployees() {

        // fetching all employees from the database
        List<Employee> employees = employeeRepository.findAll();
        // creating a new empty list to hold our DTOs
        List<EmployeesDTO> employeeDTOList = new ArrayList<>();

        // looping through each employee we found
        for (Employee employee : employees) {
            // converting the employee to a DTO
            EmployeesDTO dto = convertToDTO(employee);
            // adding the DTO to our list
            employeeDTOList.add(dto);
        }

        // returning the list of DTOs to the caller
        return employeeDTOList;
    }

    /**
     * Searches for employees using a keyword in their name or department
     * @param keyword - The word we want to search for
     * @return A list of employees that match the keyword
     */
    public List<EmployeesDTO> searchEmployees(String keyword) {

        // finding employees that have the keyword in their name or department
        List<Employee> employees = employeeRepository.findByNameContainingIgnoreCaseOrDepartmentContainingIgnoreCase(keyword, keyword);
        // creating a blank list for the results
        List<EmployeesDTO> employeeDTOList = new ArrayList<>();

        // going through each found employee one by one
        for (Employee employee : employees) {
            // converting them to DTO
            EmployeesDTO dto = convertToDTO(employee);
            // adding to the final list
            employeeDTOList.add(dto);
        }

        // sending back the results
        return employeeDTOList;
    }

    /**
     * Filters the employees by their department, role, and position
     * @param department - The department to filter by
     * @param role - The role to filter by
     * @param position - The position to filter by
     * @return A list of employees that match the filters
     */
    public List<EmployeesDTO> filterEmployees(String department, String role, String position) {
        // first, get all employees from the database
        List<Employee> allEmployees = employeeRepository.findAll();
        // make an empty list for the filtered ones
        List<EmployeesDTO> filteredList = new ArrayList<>();

        // checking every single employee
        for (Employee employee : allEmployees) {
            // assume it matches at first
            boolean matches = true;

            // check if department filter is provided and not empty
            if (department != null && !department.isEmpty()) {
                // if employee department doesn't match, set matches to false
                if (employee.getDepartment() == null || !employee.getDepartment().equalsIgnoreCase(department)) {
                    matches = false;
                }
            }
            // check if role filter is provided and not empty
            if (role != null && !role.isEmpty()) {
                // if employee role doesn't match, set matches to false
                if (employee.getRole() == null || !employee.getRole().equalsIgnoreCase(role)) {
                    matches = false;
                }
            }
            // check if position filter is provided and not empty
            if (position != null && !position.isEmpty()) {
                // if employee position doesn't match, set matches to false
                if (employee.getPosition() == null || !employee.getPosition().equalsIgnoreCase(position)) {
                    matches = false;
                }
            }

            // if it still matches all filters, we add it to the list
            if (matches) {
                // convert to DTO and add
                filteredList.add(convertToDTO(employee));
            }
        }

        // returning the list with filtered employees
        return filteredList;
    }

    /**
     * Gets a single employee by their ID number
     * @param id - The ID of the employee we want to find
     * @return The employee's data as a DTO
     */
    public EmployeesDTO getEmployeeById(Long id) {

        // looking up the employee in the database by their ID
        Employee employee = employeeRepository.findById(id).orElse(null);

        // if we couldn't find the employee, we throw an error
        if (employee == null) {
            // throwing a 404 not found error
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Employee not found with id: " + id);
        }

        // if found, convert it to DTO and return
        return convertToDTO(employee);
    }

    /**
     * Creates a brand new employee in the system
     * @param employeeDto - The data for the new employee from the form
     * @return The newly created employee as a DTO
     */
    public EmployeesDTO createEmployee(com.Suman.Employee_Directory.DTO.EmployeeCreateDTO employeeDto) {
        // making a new empty employee object
        Employee employee = new Employee();
        // setting the name from the input
        employee.setName(employeeDto.getName());
        // setting the role from the input
        employee.setRole(employeeDto.getRole());
        // setting the department from the input
        employee.setDepartment(employeeDto.getDepartment());
        // setting the position from the input
        employee.setPosition(employeeDto.getPosition());
        // setting the email from the input
        employee.setEmail(employeeDto.getEmail());
        // setting the phone from the input
        employee.setPhone(employeeDto.getPhone());

        // saving the new employee to the database
        Employee savedEmployee = employeeRepository.save(employee);

        // converting the saved employee back to a DTO to return
        return convertToDTO(savedEmployee);
    }

    /**
     * Updates an existing employee's information
     * @param id - The ID of the employee to update
     * @param updatedEmployee - The new data to update the employee with
     * @return The updated employee as a DTO
     */
    public EmployeesDTO updateEmployee(Long id, com.Suman.Employee_Directory.DTO.EmployeeCreateDTO updatedEmployee) {

        // first we try to find the employee in the database
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);

        // if they don't exist, we throw an error
        if (existingEmployee == null) {
            // throw a 404 error saying they were not found
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Employee not found with id: " + id);
        }

        // updating their name with the new value
        existingEmployee.setName(updatedEmployee.getName());
        // updating their role with the new value
        existingEmployee.setRole(updatedEmployee.getRole());
        // updating their department with the new value
        existingEmployee.setDepartment(updatedEmployee.getDepartment());
        // updating their position with the new value
        existingEmployee.setPosition(updatedEmployee.getPosition());
        // updating their email with the new value
        existingEmployee.setEmail(updatedEmployee.getEmail());
        // updating their phone with the new value
        existingEmployee.setPhone(updatedEmployee.getPhone());

        // saving the updated employee back to the database
        Employee savedEmployee = employeeRepository.save(existingEmployee);

        // returning the updated employee as a DTO
        return convertToDTO(savedEmployee);
    }

    /**
     * A helper function to convert an Employee to an EmployeesDTO
     * @param employee - The Employee object to convert
     * @return The converted EmployeesDTO object
     */
    private EmployeesDTO convertToDTO(Employee employee) {

        // making a new DTO and passing all the fields into it
        EmployeesDTO dto = new EmployeesDTO(
                employee.getId(),
                employee.getName(),
                employee.getRole(),
                employee.getDepartment(),
                employee.getPosition(),
                employee.getEmail(),
                employee.getPhone());

        // returning the created DTO
        return dto;
    }
}