package com.Suman.Employee_Directory.Repository;

import com.Suman.Employee_Directory.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    /**
     * This searches the database for employees by checking if their name or department contains the given text.
     * It ignores uppercase and lowercase letters.
     * @param name - The text to search for in the employee's name
     * @param department - The text to search for in the employee's department
     * @return A list of employees that match the search
     */
    List<Employee> findByNameContainingIgnoreCaseOrDepartmentContainingIgnoreCase(String name, String department);
}
