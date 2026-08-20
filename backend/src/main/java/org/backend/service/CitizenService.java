package org.backend.service;

import org.backend.dto.response.ComplaintResponse;
import org.backend.dto.response.UserResponse;
import org.backend.entity.Citizen;
import org.backend.entity.User;
import org.backend.exception.ResourceNotFoundException;
import org.backend.mapper.ComplaintMapper;
import org.backend.mapper.UserMapper;
import org.backend.repository.CitizenRepository;
import org.backend.repository.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CitizenService {

    private final CitizenRepository citizenRepository;
    private final ComplaintRepository complaintRepository;

    public CitizenService(
            CitizenRepository citizenRepository,
            ComplaintRepository complaintRepository
    ) {
        this.citizenRepository = citizenRepository;
        this.complaintRepository = complaintRepository;
    }


    public UserResponse getCitizenProfile(Long citizenId) {

        Citizen citizen = citizenRepository
                .findById(citizenId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Citizen not found"
                        )
                );

        User user = citizen.getUser();

        return UserMapper.toUserResponse(user);
    }


    public List<ComplaintResponse> getCitizenComplaints(
            Long citizenId
    ) {

        if (!citizenRepository.existsById(citizenId)) {
            throw new ResourceNotFoundException(
                    "Citizen not found"
            );
        }

        return complaintRepository
                .findByCitizenCitizenId(citizenId)
                .stream()
                .map(ComplaintMapper::toComplaintResponse)
                .toList();
    }

}