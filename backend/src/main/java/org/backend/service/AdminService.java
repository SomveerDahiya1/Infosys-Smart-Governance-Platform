package org.backend.service;

import org.backend.dto.response.ComplaintResponse;
import org.backend.dto.response.DashboardResponse;
import org.backend.dto.response.UserResponse;
import org.backend.entity.Admin;
import org.backend.entity.User;
import org.backend.exception.ResourceNotFoundException;
import org.backend.mapper.ComplaintMapper;
import org.backend.mapper.UserMapper;
import org.backend.repository.AdminRepository;
import org.backend.repository.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final ComplaintRepository complaintRepository;

    public AdminService(
            AdminRepository adminRepository,
            ComplaintRepository complaintRepository
    ) {
        this.adminRepository = adminRepository;
        this.complaintRepository = complaintRepository;
    }


    public UserResponse getAdminProfile(Long adminId) {

        Admin admin = adminRepository
                .findById(adminId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Admin not found"
                        )
                );

        User user = admin.getUser();

        return UserMapper.toUserResponse(user);
    }


    public List<ComplaintResponse> getAllComplaints() {

        return complaintRepository
                .findAll()
                .stream()
                .map(ComplaintMapper::toComplaintResponse)
                .toList();
    }


    public DashboardResponse getDashboardStatistics() {

        DashboardResponse response =
                new DashboardResponse();

        response.setTotalComplaints(
                complaintRepository.count()
        );

        response.setPendingComplaints(
                complaintRepository
                        .countByStatusStatusName("PENDING")
        );

        response.setAssignedComplaints(
                complaintRepository
                        .countByStatusStatusName("ASSIGNED")
        );

        response.setInProgressComplaints(
                complaintRepository
                        .countByStatusStatusName("IN_PROGRESS")
        );

        response.setResolvedComplaints(
                complaintRepository
                        .countByStatusStatusName("RESOLVED")
        );

        response.setClosedComplaints(
                complaintRepository
                        .countByStatusStatusName("CLOSED")
        );

        response.setRejectedComplaints(
                complaintRepository
                        .countByStatusStatusName("REJECTED")
        );

        return response;
    }

}