package com.Suman.Employee_Directory.Controller;

import com.Suman.Employee_Directory.DTO.EmployeesDTO;
import com.Suman.Employee_Directory.DTO.EmployeeCreateDTO;
import com.Suman.Employee_Directory.Service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    // making a space to save our service so we can talk to it
    private final EmployeeService employeeService;

    /**
     * This makes our EmployeeController and gives it the service it needs
     * @param employeeService - The service we use to get and save data
     */
    public EmployeeController(EmployeeService employeeService) {
        // setting the service to use later
        this.employeeService = employeeService;
    }

    /**
     * Gets the full list of all employees
     * @return A list of employees in DTO format
     */
    @GetMapping
    public List<EmployeesDTO> getEmployees() {
        // asking the service to get all the employees and returning them
        return employeeService.getAllEmployees();
    }

    /**
     * Searches for employees using a keyword like part of a name
     * @param keyword - The word typed in the search box
     * @return A list of employees that match
     */
    @GetMapping("/search")
    public List<EmployeesDTO> searchEmployees(@RequestParam String keyword) {
        // sending the keyword to the service to search
        return employeeService.searchEmployees(keyword);
    }

    /**
     * Filters the employees based on a few options
     * @param department - The department chosen, or empty if not chosen
     * @param role - The role chosen, or empty if not chosen
     * @param position - The position chosen, or empty if not chosen
     * @return A filtered list of employees
     */
    @GetMapping("/filter")
    public List<EmployeesDTO> filterEmployees(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String position) {
        // giving the filters to the service to find matches
        return employeeService.filterEmployees(department, role, position);
    }

    /**
     * Finds just one employee using their ID
     * @param id - The number identifying the employee
     * @return The employee data we found
     */
    @GetMapping("/{id}")
    public EmployeesDTO getEmployee(@PathVariable Long id) {
        // fetching a single employee from the service by ID
        return employeeService.getEmployeeById(id);
    }

    /**
     * Adds a brand new employee to the database
     * @param employeeDto - The new data sent from the website
     * @return A success message holding the created employee data
     */
    @PostMapping
    public ResponseEntity<EmployeesDTO> createEmployee(@RequestBody EmployeeCreateDTO employeeDto) {
        // creating the employee and wrapping it in a 201 Created response
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.createEmployee(employeeDto));
    }

    /**
     * Updates an employee that already exists
     * @param id - The ID of the employee being updated
     * @param employeeDto - The new data for them
     * @return The updated employee's data
     */
    @PutMapping("/{id}")
    public EmployeesDTO updateEmployee(@PathVariable Long id, @RequestBody EmployeeCreateDTO employeeDto) {
        // calling the service to perform the update
        return employeeService.updateEmployee(id, employeeDto);
    }
}
