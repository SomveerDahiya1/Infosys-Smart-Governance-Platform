package org.backend.dto.response;

public class DashboardResponse {

    private Long totalComplaints;

    private Long pendingComplaints;

    private Long assignedComplaints;

    private Long inProgressComplaints;

    private Long resolvedComplaints;

    private Long closedComplaints;

    private Long rejectedComplaints;


    public DashboardResponse() {
    }


    public Long getTotalComplaints() {
        return totalComplaints;
    }

    public void setTotalComplaints(Long totalComplaints) {
        this.totalComplaints = totalComplaints;
    }

    public Long getPendingComplaints() {
        return pendingComplaints;
    }

    public void setPendingComplaints(Long pendingComplaints) {
        this.pendingComplaints = pendingComplaints;
    }

    public Long getAssignedComplaints() {
        return assignedComplaints;
    }

    public void setAssignedComplaints(Long assignedComplaints) {
        this.assignedComplaints = assignedComplaints;
    }

    public Long getInProgressComplaints() {
        return inProgressComplaints;
    }

    public void setInProgressComplaints(Long inProgressComplaints) {
        this.inProgressComplaints = inProgressComplaints;
    }

    public Long getResolvedComplaints() {
        return resolvedComplaints;
    }

    public void setResolvedComplaints(Long resolvedComplaints) {
        this.resolvedComplaints = resolvedComplaints;
    }

    public Long getClosedComplaints() {
        return closedComplaints;
    }

    public void setClosedComplaints(Long closedComplaints) {
        this.closedComplaints = closedComplaints;
    }

    public Long getRejectedComplaints() {
        return rejectedComplaints;
    }

    public void setRejectedComplaints(Long rejectedComplaints) {
        this.rejectedComplaints = rejectedComplaints;
    }

}