package org.backend.service;

import org.backend.dto.response.ComplaintResponse;
import org.backend.dto.response.UserResponse;
import org.backend.entity.Officer;
import org.backend.entity.User;
import org.backend.exception.ResourceNotFoundException;
import org.backend.mapper.ComplaintMapper;
import org.backend.mapper.UserMapper;
import org.backend.repository.ComplaintAssignmentRepository;
import org.backend.repository.OfficerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfficerService {

    private final OfficerRepository officerRepository;
    private final ComplaintAssignmentRepository complaintAssignmentRepository;

    public OfficerService(
            OfficerRepository officerRepository,
            ComplaintAssignmentRepository complaintAssignmentRepository
    ) {
        this.officerRepository = officerRepository;
        this.complaintAssignmentRepository =
                complaintAssignmentRepository;
    }


    public UserResponse getOfficerProfile(Long officerId) {

        Officer officer = officerRepository
                .findById(officerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Officer not found"
                        )
                );

        User user = officer.getUser();

        return UserMapper.toUserResponse(user);
    }


    public List<ComplaintResponse> getAssignedComplaints(
            Long officerId
    ) {

        if (!officerRepository.existsById(officerId)) {
            throw new ResourceNotFoundException(
                    "Officer not found"
            );
        }

        return complaintAssignmentRepository
                .findByOfficerOfficerIdAndIsCurrentTrue(officerId)
                .stream()
                .map(assignment ->
                        ComplaintMapper.toComplaintResponse(
                                assignment.getComplaint()
                        )
                )
                .toList();
    }

}