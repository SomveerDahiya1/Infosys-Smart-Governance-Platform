package org.backend.dto.request;

import java.time.LocalDate;

public class UpdateComplaintRequest {

    private Short statusId;

    private Short priorityId;

    private LocalDate estimatedCompletionDate;

    private String remarks;


    public UpdateComplaintRequest() {
    }


    public Short getStatusId() {
        return statusId;
    }

    public void setStatusId(Short statusId) {
        this.statusId = statusId;
    }

    public Short getPriorityId() {
        return priorityId;
    }

    public void setPriorityId(Short priorityId) {
        this.priorityId = priorityId;
    }

    public LocalDate getEstimatedCompletionDate() {
        return estimatedCompletionDate;
    }

    public void setEstimatedCompletionDate(
            LocalDate estimatedCompletionDate
    ) {
        this.estimatedCompletionDate = estimatedCompletionDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

}