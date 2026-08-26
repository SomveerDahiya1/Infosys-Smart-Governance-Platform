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
import org.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    private final ComplaintRepository complaintRepository;

    private final UserRepository userRepository;


    public AdminService(
            AdminRepository adminRepository,
            ComplaintRepository complaintRepository,
            UserRepository userRepository
    ) {

        this.adminRepository =
                adminRepository;

        this.complaintRepository =
                complaintRepository;

        this.userRepository =
                userRepository;
    }


    // ==========================================
    // GET LOGGED-IN ADMIN PROFILE
    // ==========================================

    public UserResponse getAdminProfileByEmail(
            String email
    ) {

        // ------------------------------------------
        // Find logged-in user
        // ------------------------------------------

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );


        // ------------------------------------------
        // Verify that this user is an ADMIN
        // ------------------------------------------

        if (
                user.getRole() == null ||
                        !"ADMIN".equalsIgnoreCase(
                                user.getRole().getRoleName()
                        )
        ) {

            throw new ResourceNotFoundException(
                    "Admin profile not found"
            );
        }


        // ------------------------------------------
        // Verify Admin record exists
        // ------------------------------------------

        Admin admin =
                adminRepository
                        .findByUserUserId(
                                user.getUserId()
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Admin profile not found"
                                )
                        );


        // ------------------------------------------
        // Return UserResponse
        // ------------------------------------------

        return UserMapper.toUserResponse(
                admin.getUser()
        );
    }


    // ==========================================
    // EXISTING ADMIN PROFILE METHOD
    // ==========================================

    public UserResponse getAdminProfile(
            Long adminId
    ) {

        Admin admin =
                adminRepository
                        .findById(adminId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Admin not found"
                                )
                        );

        User user =
                admin.getUser();

        return UserMapper.toUserResponse(
                user
        );
    }


    // ==========================================
    // GET ALL COMPLAINTS
    // ==========================================

    public List<ComplaintResponse>
    getAllComplaints() {

        return complaintRepository
                .findAll()
                .stream()
                .map(
                        ComplaintMapper::toComplaintResponse
                )
                .toList();
    }


    // ==========================================
    // ADMIN DASHBOARD STATISTICS
    // ==========================================

    public DashboardResponse
    getDashboardStatistics() {

        DashboardResponse response =
                new DashboardResponse();


        response.setTotalComplaints(
                complaintRepository.count()
        );


        response.setPendingComplaints(
                complaintRepository
                        .countByStatusStatusName(
                                "PENDING"
                        )
        );


        response.setAssignedComplaints(
                complaintRepository
                        .countByStatusStatusName(
                                "ASSIGNED"
                        )
        );


        response.setInProgressComplaints(
                complaintRepository
                        .countByStatusStatusName(
                                "IN_PROGRESS"
                        )
        );


        response.setResolvedComplaints(
                complaintRepository
                        .countByStatusStatusName(
                                "RESOLVED"
                        )
        );


        response.setClosedComplaints(
                complaintRepository
                        .countByStatusStatusName(
                                "CLOSED"
                        )
        );


        return response;
    }

}