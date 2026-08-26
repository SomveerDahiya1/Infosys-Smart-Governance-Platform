package org.backend.mapper;

import org.backend.dto.response.ComplaintResponse;
import org.backend.entity.Citizen;
import org.backend.entity.Complaint;
import org.backend.entity.ComplaintAssignment;
import org.backend.entity.User;

public class ComplaintMapper {

    public static ComplaintResponse toComplaintResponse(
            Complaint complaint
    ) {

        return toComplaintResponse(
                complaint,
                null
        );
    }


    public static ComplaintResponse toComplaintResponse(
            Complaint complaint,
            ComplaintAssignment assignment
    ) {

        if (complaint == null) {
            return null;
        }

        ComplaintResponse response =
                new ComplaintResponse();


        // ==========================================
        // COMPLAINT
        // ==========================================

        response.setComplaintId(
                complaint.getComplaintId()
        );

        response.setTitle(
                complaint.getTitle()
        );

        response.setDescription(
                complaint.getDescription()
        );


        // ==========================================
        // CATEGORY
        // ==========================================

        if (complaint.getCategory() != null) {

            response.setCategory(
                    complaint.getCategory()
                            .getCategoryName()
            );
        }


        // ==========================================
        // PRIORITY
        // ==========================================

        if (complaint.getPriority() != null) {

            response.setPriority(
                    complaint.getPriority()
                            .getPriorityName()
            );
        }


        // ==========================================
        // STATUS
        // ==========================================

        if (complaint.getStatus() != null) {

            response.setStatus(
                    complaint.getStatus()
                            .getStatusName()
            );
        }


        // ==========================================
        // CITIZEN
        // ==========================================

        Citizen citizen =
                complaint.getCitizen();

        if (citizen != null) {

            response.setCitizenId(
                    citizen.getCitizenId()
            );

            User user =
                    citizen.getUser();

            if (user != null) {

                String firstName =
                        user.getFirstName();

                String lastName =
                        user.getLastName();

                String fullName =
                        "";

                if (firstName != null) {
                    fullName = firstName;
                }

                if (lastName != null &&
                        !lastName.isBlank()) {

                    if (!fullName.isBlank()) {
                        fullName += " ";
                    }

                    fullName += lastName;
                }

                response.setCitizenName(
                        fullName
                );
            }
        }


        // ==========================================
        // LOCATION
        // ==========================================

        if (complaint.getLocation() != null) {

            response.setAddressLine(
                    complaint.getLocation()
                            .getAddressLine()
            );

            response.setArea(
                    complaint.getLocation()
                            .getArea()
            );

            response.setCity(
                    complaint.getLocation()
                            .getCity()
            );

            response.setState(
                    complaint.getLocation()
                            .getState()
            );

            response.setPincode(
                    complaint.getLocation()
                            .getPincode()
            );
        }


        // ==========================================
        // DATES
        // ==========================================

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


        // ==========================================
        // CURRENT ASSIGNMENT
        // ==========================================

        if (assignment != null) {

            // --------------------------------------
            // OFFICER
            // --------------------------------------

            if (assignment.getOfficer() != null) {

                response.setAssignedOfficerId(
                        assignment.getOfficer()
                                .getOfficerId()
                );

                User officerUser =
                        assignment.getOfficer()
                                .getUser();

                if (officerUser != null) {

                    String firstName =
                            officerUser.getFirstName();

                    String lastName =
                            officerUser.getLastName();

                    String fullName =
                            "";

                    if (firstName != null) {
                        fullName = firstName;
                    }

                    if (lastName != null &&
                            !lastName.isBlank()) {

                        if (!fullName.isBlank()) {
                            fullName += " ";
                        }

                        fullName += lastName;
                    }

                    response.setAssignedOfficerName(
                            fullName
                    );

                    response.setAssignedOfficerEmail(
                            officerUser.getEmail()
                    );
                }
            }


            // --------------------------------------
            // ASSIGNED BY
            // --------------------------------------

            if (assignment.getAssignedBy() != null) {

                User assignedBy =
                        assignment.getAssignedBy();

                String firstName =
                        assignedBy.getFirstName();

                String lastName =
                        assignedBy.getLastName();

                String fullName =
                        "";

                if (firstName != null) {
                    fullName = firstName;
                }

                if (lastName != null &&
                        !lastName.isBlank()) {

                    if (!fullName.isBlank()) {
                        fullName += " ";
                    }

                    fullName += lastName;
                }

                response.setAssignedByName(
                        fullName
                );
            }


            // --------------------------------------
            // ASSIGNED AT
            // --------------------------------------

            response.setAssignedAt(
                    assignment.getAssignedAt()
            );


            // --------------------------------------
            // ASSIGNMENT REMARKS
            // --------------------------------------

            response.setAssignmentRemarks(
                    assignment.getAssignmentRemarks()
            );
        }


        return response;
    }
}