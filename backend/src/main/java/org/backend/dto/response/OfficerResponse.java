package org.backend.dto.response;

public class OfficerResponse {

    private Long officerId;

    private String firstName;

    private String lastName;

    private String email;

    private String employeeCode;

    // Current IN_PROGRESS complaints
    private Long workload;


    public OfficerResponse() {
    }


    // ==========================================
    // GETTERS & SETTERS
    // ==========================================

    public Long getOfficerId() {
        return officerId;
    }

    public void setOfficerId(Long officerId) {
        this.officerId = officerId;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }


    public Long getWorkload() {
        return workload;
    }

    public void setWorkload(Long workload) {
        this.workload = workload;
    }
}