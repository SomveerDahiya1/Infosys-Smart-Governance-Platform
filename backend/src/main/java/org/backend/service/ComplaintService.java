package org.backend.service;

import org.backend.dto.request.AssignComplaintRequest;
import org.backend.dto.request.CreateComplaintRequest;
import org.backend.dto.request.UpdateComplaintRequest;
import org.backend.dto.response.ComplaintResponse;
import org.backend.entity.Citizen;
import org.backend.entity.Complaint;
import org.backend.entity.ComplaintAssignment;
import org.backend.entity.ComplaintCategory;
import org.backend.entity.ComplaintPriority;
import org.backend.entity.ComplaintStatus;
import org.backend.entity.ComplaintStatusHistory;
import org.backend.entity.Location;
import org.backend.entity.Officer;
import org.backend.entity.User;
import org.backend.exception.ResourceNotFoundException;
import org.backend.mapper.ComplaintMapper;
import org.backend.repository.CitizenRepository;
import org.backend.repository.ComplaintAssignmentRepository;
import org.backend.repository.ComplaintCategoryRepository;
import org.backend.repository.ComplaintPriorityRepository;
import org.backend.repository.ComplaintRepository;
import org.backend.repository.ComplaintStatusHistoryRepository;
import org.backend.repository.ComplaintStatusRepository;
import org.backend.repository.LocationRepository;
import org.backend.repository.OfficerRepository;
import org.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final CitizenRepository citizenRepository;
    private final ComplaintCategoryRepository categoryRepository;
    private final ComplaintPriorityRepository priorityRepository;
    private final ComplaintStatusRepository statusRepository;
    private final LocationRepository locationRepository;
    private final OfficerRepository officerRepository;
    private final UserRepository userRepository;
    private final ComplaintAssignmentRepository assignmentRepository;
    private final ComplaintStatusHistoryRepository statusHistoryRepository;


    public ComplaintService(
            ComplaintRepository complaintRepository,
            CitizenRepository citizenRepository,
            ComplaintCategoryRepository categoryRepository,
            ComplaintPriorityRepository priorityRepository,
            ComplaintStatusRepository statusRepository,
            LocationRepository locationRepository,
            OfficerRepository officerRepository,
            UserRepository userRepository,
            ComplaintAssignmentRepository assignmentRepository,
            ComplaintStatusHistoryRepository statusHistoryRepository
    ) {
        this.complaintRepository = complaintRepository;
        this.citizenRepository = citizenRepository;
        this.categoryRepository = categoryRepository;
        this.priorityRepository = priorityRepository;
        this.statusRepository = statusRepository;
        this.locationRepository = locationRepository;
        this.officerRepository = officerRepository;
        this.userRepository = userRepository;
        this.assignmentRepository = assignmentRepository;
        this.statusHistoryRepository = statusHistoryRepository;
    }


    @Transactional
    public ComplaintResponse createComplaint(
            Long citizenId,
            CreateComplaintRequest request
    ) {

        Citizen citizen = citizenRepository
                .findById(citizenId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Citizen not found"
                        )
                );


        ComplaintCategory category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Complaint category not found"
                        )
                );


        ComplaintPriority priority = priorityRepository
                .findById(request.getPriorityId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Complaint priority not found"
                        )
                );


        ComplaintStatus status = statusRepository
                .findByStatusName("PENDING")
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "PENDING status not found"
                        )
                );


        Location location = new Location();

        location.setAddressLine(
                request.getAddressLine()
        );

        location.setArea(
                request.getArea()
        );

        location.setCity(
                request.getCity()
        );

        location.setState(
                request.getState()
        );

        location.setPincode(
                request.getPincode()
        );

        location.setLatitude(
                request.getLatitude()
        );

        location.setLongitude(
                request.getLongitude()
        );

        location = locationRepository.save(location);


        Complaint complaint = new Complaint();

        complaint.setCitizen(citizen);
        complaint.setCategory(category);
        complaint.setPriority(priority);
        complaint.setStatus(status);
        complaint.setLocation(location);

        complaint.setTitle(request.getTitle());
        complaint.setDescription(request.getDescription());

        complaint.setSubmittedAt(
                LocalDateTime.now()
        );

        complaint = complaintRepository.save(complaint);


        return ComplaintMapper.toComplaintResponse(
                complaint
        );
    }


    public ComplaintResponse getComplaintById(
            Long complaintId
    ) {

        Complaint complaint = complaintRepository
                .findById(complaintId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Complaint not found"
                        )
                );

        return ComplaintMapper.toComplaintResponse(
                complaint
        );
    }


    @Transactional
    public ComplaintResponse updateComplaint(
            Long complaintId,
            Long userId,
            UpdateComplaintRequest request
    ) {

        Complaint complaint = complaintRepository
                .findById(complaintId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Complaint not found"
                        )
                );


        User changedBy = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );


        ComplaintStatus oldStatus =
                complaint.getStatus();


        if (request.getStatusId() != null) {

            ComplaintStatus newStatus =
                    statusRepository
                            .findById(request.getStatusId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Complaint status not found"
                                    )
                            );

            complaint.setStatus(newStatus);


            ComplaintStatusHistory history =
                    new ComplaintStatusHistory();

            history.setComplaint(complaint);
            history.setOldStatus(oldStatus);
            history.setNewStatus(newStatus);
            history.setChangedBy(changedBy);
            history.setRemarks(request.getRemarks());

            statusHistoryRepository.save(history);


            if ("RESOLVED".equals(
                    newStatus.getStatusName()
            )) {

                complaint.setResolvedAt(
                        LocalDateTime.now()
                );

            }


            if ("CLOSED".equals(
                    newStatus.getStatusName()
            )) {

                complaint.setClosedAt(
                        LocalDateTime.now()
                );

            }

        }
        if (request.getPriorityId() != null) {
            ComplaintPriority priority =
                    priorityRepository
                            .findById(request.getPriorityId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Complaint priority not found"
                                    )
                            );
            complaint.setPriority(priority);
        }
        if (request.getEstimatedCompletionDate() != null) {
            complaint.setEstimatedCompletionDate(
                    request.getEstimatedCompletionDate()
            );
        }
        complaint = complaintRepository.save(
                complaint
        );
        return ComplaintMapper.toComplaintResponse(
                complaint
        );
    }

    @Transactional
    public ComplaintResponse assignComplaint(
            Long complaintId,
            Long adminUserId,
            AssignComplaintRequest request
    ) {

        Complaint complaint = complaintRepository
                .findById(complaintId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Complaint not found"
                        )
                );


        Officer officer = officerRepository
                .findById(request.getOfficerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Officer not found"
                        )
                );


        User assignedBy = userRepository
                .findById(adminUserId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Admin user not found"
                        )
                );


        ComplaintAssignment currentAssignment =
                assignmentRepository
                        .findByComplaintComplaintIdAndIsCurrentTrue(
                                complaintId
                        )
                        .orElse(null);


        if (currentAssignment != null) {

            currentAssignment.setIsCurrent(false);

            currentAssignment.setUnassignedAt(
                    LocalDateTime.now()
            );

            assignmentRepository.save(
                    currentAssignment
            );
        }

        ComplaintAssignment assignment =
                new ComplaintAssignment();

        assignment.setComplaint(complaint);
        assignment.setOfficer(officer);
        assignment.setAssignedBy(assignedBy);

        assignment.setAssignedAt(
                LocalDateTime.now()
        );

        assignment.setIsCurrent(true);

        assignment.setAssignmentRemarks(
                request.getAssignmentRemarks()
        );
        assignmentRepository.save(assignment);
        ComplaintStatus assignedStatus =
                statusRepository
                        .findByStatusName("ASSIGNED")
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "ASSIGNED status not found"
                                )
                        );

        ComplaintStatus oldStatus =
                complaint.getStatus();

        complaint.setStatus(assignedStatus);

        complaint = complaintRepository.save(
                complaint
        );

        ComplaintStatusHistory history =
                new ComplaintStatusHistory();
        history.setComplaint(complaint);
        history.setOldStatus(oldStatus);
        history.setNewStatus(assignedStatus);
        history.setChangedBy(assignedBy);
        history.setRemarks(
                request.getAssignmentRemarks()
        );
        statusHistoryRepository.save(history);
        return ComplaintMapper.toComplaintResponse(
                complaint
        );
    }

}