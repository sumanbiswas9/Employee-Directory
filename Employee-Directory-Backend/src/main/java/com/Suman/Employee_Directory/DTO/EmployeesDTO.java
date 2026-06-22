package com.Suman.Employee_Directory.DTO;

/**
 * This class is used to send employee data back to the user without sending database details
 */
public class EmployeesDTO {
    private Long id;
    private String name;
    private String role;
    private String department;
    private String position;
    private String email;
    private String phone;

    public EmployeesDTO() {
    }

    public EmployeesDTO(Long id, String name, String role, String department, String position, String email, String phone) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.department = department;
        this.position = position;
        this.email = email;
        this.phone = phone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}