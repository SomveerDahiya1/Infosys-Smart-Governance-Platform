package org.backend.mapper;

import org.backend.dto.response.ComplaintResponse;
import org.backend.entity.Complaint;

public class ComplaintMapper {

    public static ComplaintResponse toComplaintResponse(
            Complaint complaint
    ) {

        if (complaint == null) {
            return null;
        }

        ComplaintResponse response =
                new ComplaintResponse();
        response.setComplaintId(
                complaint.getComplaintId()
        );

        response.setTitle(
                complaint.getTitle()
        );

        response.setDescription(
                complaint.getDescription()
        );


        if (complaint.getCategory() != null) {
            response.setCategory(
                    complaint.getCategory().getCategoryName()
            );

        }
        if (complaint.getPriority() != null) {

            response.setPriority(
                    complaint.getPriority().getPriorityName()
            );

        }
        if (complaint.getStatus() != null) {
            response.setStatus(
                    complaint.getStatus().getStatusName()
            );
        }
        if (complaint.getLocation() != null) {

            response.setAddressLine(
                    complaint.getLocation().getAddressLine()
            );

            response.setArea(
                    complaint.getLocation().getArea()
            );

            response.setCity(
                    complaint.getLocation().getCity()
            );

            response.setState(
                    complaint.getLocation().getState()
            );

            response.setPincode(
                    complaint.getLocation().getPincode()
            );

        }
        response.setSubmittedAt(
                complaint.getSubmittedAt()
        );

        response.setEstimatedCompletionDate(
                complaint.getEstimatedCompletionDate()
        );

        response.setResolvedAt(
                complaint.getResolvedAt()
        );

        response.setClosedAt(
                complaint.getClosedAt()
        );

        return response;
    }

}