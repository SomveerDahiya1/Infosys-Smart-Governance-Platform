package org.backend.dto.request;

public class AssignComplaintRequest {
    private Long officerId;
    private String assignmentRemarks;
    public AssignComplaintRequest() {
    }

    public Long getOfficerId() {
        return officerId;
    }
    public void setOfficerId(Long officerId) {
        this.officerId = officerId;
    }

    public String getAssignmentRemarks() {
        return assignmentRemarks;
    }

    public void setAssignmentRemarks(String assignmentRemarks) {
        this.assignmentRemarks = assignmentRemarks;
    }
}
