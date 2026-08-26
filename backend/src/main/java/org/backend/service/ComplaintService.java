package org.backend.service;

import org.backend.dto.request.AssignComplaintRequest;
import org.backend.dto.request.CreateComplaintRequest;
import org.backend.dto.request.UpdateComplaintRequest;
import org.backend.dto.response.ComplaintResponse;
import org.backend.dto.response.ComplaintStatusHistoryResponse;
import org.backend.dto.response.DashboardResponse;

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
import java.util.List;

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


    // ==========================================
    // GET ALL COMPLAINTS
    // ==========================================

    @Transactional(readOnly = true)
    public List<ComplaintResponse> getAllComplaints() {

        return complaintRepository
                .findAll()
                .stream()
                .map(complaint -> {

                    ComplaintAssignment assignment =
                            assignmentRepository
                                    .findByComplaintComplaintIdAndIsCurrentTrue(
                                            complaint.getComplaintId()
                                    )
                                    .orElse(null);

                    return ComplaintMapper.toComplaintResponse(
                            complaint,
                            assignment
                    );
                })
                .toList();
    }


    // ==========================================
    // FILTER COMPLAINTS
    // ==========================================

    @Transactional(readOnly = true)
    public List<ComplaintResponse> filterComplaints(
            Short statusId,
            Short priorityId,
            Long categoryId
    ) {

        List<Complaint> complaints =
                complaintRepository.findByFilters(
                        statusId,
                        priorityId,
                        categoryId
                );

        return complaints
                .stream()
                .map(complaint -> {

                    ComplaintAssignment assignment =
                            assignmentRepository
                                    .findByComplaintComplaintIdAndIsCurrentTrue(
                                            complaint.getComplaintId()
                                    )
                                    .orElse(null);

                    return ComplaintMapper.toComplaintResponse(
                            complaint,
                            assignment
                    );
                })
                .toList();
    }


    // ==========================================
    // GET DASHBOARD STATISTICS
    // ==========================================

    @Transactional(readOnly = true)
    public DashboardResponse getDashboardStatistics() {

        DashboardResponse response =
                new DashboardResponse();

        response.setTotalComplaints(
                complaintRepository.count()
        );

        response.setPendingComplaints(
                complaintRepository.countByStatusStatusName(
                        "PENDING"
                )
        );

        /*
         * ASSIGNED status is no longer used after assigning.
         * Assignment directly changes complaint status to
         * IN_PROGRESS.
         */
        response.setAssignedComplaints(
                0L
        );

        response.setInProgressComplaints(
                complaintRepository.countByStatusStatusName(
                        "IN_PROGRESS"
                )
        );

        response.setResolvedComplaints(
                complaintRepository.countByStatusStatusName(
                        "RESOLVED"
                )
        );

        response.setClosedComplaints(
                complaintRepository.countByStatusStatusName(
                        "CLOSED"
                )
        );

        response.setRejectedComplaints(
                complaintRepository.countByStatusStatusName(
                        "REJECTED"
                )
        );

        return response;
    }


    // ==========================================
    // GET COMPLAINT BY ID
    // ==========================================

    @Transactional(readOnly = true)
    public ComplaintResponse getComplaintById(
            Long complaintId
    ) {

        Complaint complaint =
                complaintRepository
                        .findById(complaintId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Complaint not found"
                                )
                        );

        ComplaintAssignment assignment =
                assignmentRepository
                        .findByComplaintComplaintIdAndIsCurrentTrue(
                                complaintId
                        )
                        .orElse(null);

        return ComplaintMapper.toComplaintResponse(
                complaint,
                assignment
        );
    }


    // ==========================================
    // GET COMPLAINTS BY CITIZEN
    // ==========================================

    @Transactional(readOnly = true)
    public List<ComplaintResponse> getComplaintsByCitizen(
            Long citizenId
    ) {

        Citizen citizen =
                citizenRepository
                        .findById(citizenId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Citizen not found"
                                )
                        );

        List<Complaint> complaints =
                complaintRepository
                        .findByCitizenCitizenId(
                                citizen.getCitizenId()
                        );

        return complaints
                .stream()
                .map(complaint -> {

                    ComplaintAssignment assignment =
                            assignmentRepository
                                    .findByComplaintComplaintIdAndIsCurrentTrue(
                                            complaint.getComplaintId()
                                    )
                                    .orElse(null);

                    return ComplaintMapper.toComplaintResponse(
                            complaint,
                            assignment
                    );
                })
                .toList();
    }


    // ==========================================
    // GET ASSIGNED COMPLAINTS FOR OFFICER
    // ==========================================

    @Transactional(readOnly = true)
    public List<ComplaintResponse> getAssignedComplaints(
            Long officerId
    ) {

        Officer officer =
                officerRepository
                        .findById(officerId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Officer not found"
                                )
                        );

        List<ComplaintAssignment> assignments =
                assignmentRepository
                        .findByOfficerOfficerIdAndIsCurrentTrue(
                                officer.getOfficerId()
                        );

        return assignments
                .stream()
                .map(assignment ->
                        ComplaintMapper.toComplaintResponse(
                                assignment.getComplaint(),
                                assignment
                        )
                )
                .toList();
    }


    // ==========================================
    // CREATE COMPLAINT
    // ==========================================

    @Transactional
    public ComplaintResponse createComplaint(
            Long citizenId,
            CreateComplaintRequest request
    ) {

        Citizen citizen =
                citizenRepository
                        .findById(citizenId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Citizen not found"
                                )
                        );


        ComplaintCategory category =
                categoryRepository
                        .findById(request.getCategoryId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Complaint category not found"
                                )
                        );


        ComplaintPriority priority =
                priorityRepository
                        .findById(request.getPriorityId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Complaint priority not found"
                                )
                        );


        ComplaintStatus status =
                statusRepository
                        .findByStatusName("PENDING")
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "PENDING status not found"
                                )
                        );


        // ==========================================
        // CREATE LOCATION
        // ==========================================

        Location location =
                new Location();

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

        location =
                locationRepository.save(
                        location
                );


        // ==========================================
        // CREATE COMPLAINT
        // ==========================================

        Complaint complaint =
                new Complaint();

        complaint.setCitizen(
                citizen
        );

        complaint.setCategory(
                category
        );

        complaint.setPriority(
                priority
        );

        complaint.setStatus(
                status
        );

        complaint.setLocation(
                location
        );

        complaint.setTitle(
                request.getTitle()
        );

        complaint.setDescription(
                request.getDescription()
        );

        complaint.setSubmittedAt(
                LocalDateTime.now()
        );

        complaint =
                complaintRepository.save(
                        complaint
                );


        return ComplaintMapper.toComplaintResponse(
                complaint,
                null
        );
    }


    // ==========================================
    // UPDATE COMPLAINT
    // ==========================================

    @Transactional
    public ComplaintResponse updateComplaint(
            Long complaintId,
            Long userId,
            UpdateComplaintRequest request
    ) {

        Complaint complaint =
                complaintRepository
                        .findById(complaintId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Complaint not found"
                                )
                        );


        User changedBy =
                userRepository
                        .findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );


        // ==========================================
        // UPDATE TITLE
        // ==========================================

        if (request.getTitle() != null) {

            complaint.setTitle(
                    request.getTitle()
            );
        }


        // ==========================================
        // UPDATE DESCRIPTION
        // ==========================================

        if (request.getDescription() != null) {

            complaint.setDescription(
                    request.getDescription()
            );
        }


        // ==========================================
        // UPDATE STATUS
        // ==========================================

        if (request.getStatusId() != null) {

            ComplaintStatus oldStatus =
                    complaint.getStatus();

            ComplaintStatus newStatus =
                    statusRepository
                            .findById(
                                    request.getStatusId()
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Complaint status not found"
                                    )
                            );


            complaint.setStatus(
                    newStatus
            );


            // ==========================================
            // STATUS HISTORY
            // ==========================================

            ComplaintStatusHistory history =
                    new ComplaintStatusHistory();

            history.setComplaint(
                    complaint
            );

            history.setOldStatus(
                    oldStatus
            );

            history.setNewStatus(
                    newStatus
            );

            history.setChangedBy(
                    changedBy
            );

            history.setRemarks(
                    request.getRemarks()
            );

            history.setChangedAt(
                    LocalDateTime.now()
            );

            statusHistoryRepository.save(
                    history
            );


            // ==========================================
            // RESOLVED TIME
            // ==========================================

            if ("RESOLVED".equals(
                    newStatus.getStatusName()
            )) {

                complaint.setResolvedAt(
                        LocalDateTime.now()
                );
            }


            // ==========================================
            // CLOSED TIME
            // ==========================================

            if ("CLOSED".equals(
                    newStatus.getStatusName()
            )) {

                complaint.setClosedAt(
                        LocalDateTime.now()
                );
            }
        }


        // ==========================================
        // UPDATE PRIORITY
        // ==========================================

        if (request.getPriorityId() != null) {

            ComplaintPriority priority =
                    priorityRepository
                            .findById(
                                    request.getPriorityId()
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Complaint priority not found"
                                    )
                            );

            complaint.setPriority(
                    priority
            );
        }


        // ==========================================
        // UPDATE ESTIMATED COMPLETION DATE
        // ==========================================

        if (request.getEstimatedCompletionDate() != null) {

            complaint.setEstimatedCompletionDate(
                    request.getEstimatedCompletionDate()
            );
        }


        complaint =
                complaintRepository.save(
                        complaint
                );


        ComplaintAssignment assignment =
                assignmentRepository
                        .findByComplaintComplaintIdAndIsCurrentTrue(
                                complaintId
                        )
                        .orElse(null);


        return ComplaintMapper.toComplaintResponse(
                complaint,
                assignment
        );
    }


    // ==========================================
    // ASSIGN COMPLAINT TO OFFICER
    // ==========================================

    @Transactional
    public ComplaintResponse assignComplaint(
            Long complaintId,
            Long adminUserId,
            AssignComplaintRequest request
    ) {

        // ==========================================
        // FIND COMPLAINT
        // ==========================================

        Complaint complaint =
                complaintRepository
                        .findById(complaintId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Complaint not found"
                                )
                        );


        // ==========================================
        // FIND OFFICER
        // ==========================================

        Officer officer =
                officerRepository
                        .findById(
                                request.getOfficerId()
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Officer not found"
                                )
                        );


        // ==========================================
        // FIND ADMIN
        // ==========================================

        User assignedBy =
                userRepository
                        .findById(
                                adminUserId
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Admin user not found"
                                )
                        );


        // ==========================================
        // CLOSE PREVIOUS ASSIGNMENT
        // ==========================================

        ComplaintAssignment currentAssignment =
                assignmentRepository
                        .findByComplaintComplaintIdAndIsCurrentTrue(
                                complaintId
                        )
                        .orElse(null);


        if (currentAssignment != null) {

            currentAssignment.setIsCurrent(
                    false
            );

            currentAssignment.setUnassignedAt(
                    LocalDateTime.now()
            );

            assignmentRepository.save(
                    currentAssignment
            );
        }


        // ==========================================
        // CREATE NEW ASSIGNMENT
        // ==========================================

        ComplaintAssignment assignment =
                new ComplaintAssignment();

        assignment.setComplaint(
                complaint
        );

        assignment.setOfficer(
                officer
        );

        assignment.setAssignedBy(
                assignedBy
        );

        assignment.setAssignedAt(
                LocalDateTime.now()
        );

        assignment.setIsCurrent(
                true
        );

        assignment.setAssignmentRemarks(
                request.getAssignmentRemarks()
        );

        assignment =
                assignmentRepository.save(
                        assignment
                );


        // ==========================================
        // CHANGE STATUS TO IN_PROGRESS
        // ==========================================

        ComplaintStatus assignedStatus =
                statusRepository
                        .findByStatusName("IN_PROGRESS")
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "IN_PROGRESS status not found"
                                )
                        );


        ComplaintStatus oldStatus =
                complaint.getStatus();


        complaint.setStatus(
                assignedStatus
        );


        complaint =
                complaintRepository.save(
                        complaint
                );


        // ==========================================
        // STATUS HISTORY
        // ==========================================

        ComplaintStatusHistory history =
                new ComplaintStatusHistory();

        history.setComplaint(
                complaint
        );

        history.setOldStatus(
                oldStatus
        );

        history.setNewStatus(
                assignedStatus
        );

        history.setChangedBy(
                assignedBy
        );

        history.setRemarks(
                request.getAssignmentRemarks()
        );

        history.setChangedAt(
                LocalDateTime.now()
        );

        statusHistoryRepository.save(
                history
        );


        // ==========================================
        // RETURN UPDATED COMPLAINT
        // ==========================================

        return ComplaintMapper.toComplaintResponse(
                complaint,
                assignment
        );
    }


    // ==========================================
    // GET COMPLAINT STATUS HISTORY
    // ==========================================

    @Transactional(readOnly = true)
    public List<ComplaintStatusHistoryResponse>
    getComplaintStatusHistory(
            Long complaintId
    ) {

        Complaint complaint =
                complaintRepository
                        .findById(complaintId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Complaint not found"
                                )
                        );


        List<ComplaintStatusHistory> historyList =
                statusHistoryRepository
                        .findByComplaintComplaintIdOrderByChangedAtDesc(
                                complaint.getComplaintId()
                        );


        return historyList
                .stream()
                .map(history -> {

                    ComplaintStatusHistoryResponse response =
                            new ComplaintStatusHistoryResponse();


                    response.setHistoryId(
                            history.getHistoryId()
                    );


                    // ==========================================
                    // OLD STATUS
                    // ==========================================

                    if (history.getOldStatus() != null) {

                        response.setOldStatus(
                                history.getOldStatus()
                                        .getStatusName()
                        );
                    }


                    // ==========================================
                    // NEW STATUS
                    // ==========================================

                    if (history.getNewStatus() != null) {

                        response.setNewStatus(
                                history.getNewStatus()
                                        .getStatusName()
                        );
                    }


                    // ==========================================
                    // CHANGED BY
                    // ==========================================

                    if (history.getChangedBy() != null) {

                        response.setChangedByUserId(
                                history.getChangedBy()
                                        .getUserId()
                        );

                        String firstName =
                                history.getChangedBy()
                                        .getFirstName();

                        String lastName =
                                history.getChangedBy()
                                        .getLastName();

                        String fullName =
                                firstName != null
                                        ? firstName
                                        : "";

                        if (lastName != null &&
                                !lastName.isBlank()) {

                            if (!fullName.isBlank()) {
                                fullName += " ";
                            }

                            fullName += lastName;
                        }

                        response.setChangedByName(
                                fullName
                        );
                    }


                    response.setRemarks(
                            history.getRemarks()
                    );

                    response.setChangedAt(
                            history.getChangedAt()
                    );


                    return response;

                })
                .toList();
    }
}