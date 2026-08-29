package org.backend.service;

import org.backend.dto.request.UpdateProfileRequest;

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

import org.springframework.transaction.annotation.Transactional;

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

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found with email: "
                                                + email
                                )
                        );


        // ------------------------------------------
        // Verify ADMIN role
        // ------------------------------------------

        if (
                user.getRole() == null ||
                        !"ADMIN".equalsIgnoreCase(
                                user.getRole().getRoleName()
                        )
        ) {

            throw new ResourceNotFoundException(
                    "Logged-in user is not an admin"
            );
        }


        // ------------------------------------------
        // Return REAL user data
        //
        // We intentionally do NOT require an
        // entry in admins table for profile loading.
        // ------------------------------------------

        return UserMapper.toUserResponse(
                user
        );
    }


    // ==========================================
    // UPDATE LOGGED-IN ADMIN PROFILE
    // ==========================================

    @Transactional
    public UserResponse updateAdminProfile(
            String email,
            UpdateProfileRequest request
    ) {

        // ------------------------------------------
        // Find logged-in user
        // ------------------------------------------

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found with email: "
                                                + email
                                )
                        );


        // ------------------------------------------
        // Verify ADMIN role
        // ------------------------------------------

        if (
                user.getRole() == null ||
                        !"ADMIN".equalsIgnoreCase(
                                user.getRole().getRoleName()
                        )
        ) {

            throw new ResourceNotFoundException(
                    "Logged-in user is not an admin"
            );
        }


        // ------------------------------------------
        // Validate first name
        // ------------------------------------------

        if (
                request.getFirstName() == null ||
                        request.getFirstName().trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "First name cannot be empty"
            );
        }


        // ------------------------------------------
        // Update first name
        // ------------------------------------------

        user.setFirstName(
                request.getFirstName().trim()
        );


        // ------------------------------------------
        // Update last name
        // ------------------------------------------

        if (request.getLastName() != null) {

            user.setLastName(
                    request.getLastName().trim()
            );

        } else {

            user.setLastName(null);
        }


        // ------------------------------------------
        // Update phone number
        // ------------------------------------------

        String newPhone =
                request.getPhoneNumber();


        if (
                newPhone != null &&
                        !newPhone.trim().isEmpty()
        ) {

            newPhone =
                    newPhone.trim();


            // Check whether phone belongs to
            // another user.

            boolean phoneUsedByAnotherUser =
                    userRepository
                            .existsByPhoneNumberAndUserIdNot(
                                    newPhone,
                                    user.getUserId()
                            );


            if (phoneUsedByAnotherUser) {

                throw new IllegalArgumentException(
                        "Phone number is already registered with another user"
                );
            }


            user.setPhoneNumber(
                    newPhone
            );

        } else {

            user.setPhoneNumber(null);
        }


        // ------------------------------------------
        // Save to PostgreSQL
        // ------------------------------------------

        User updatedUser =
                userRepository.save(user);


        // ------------------------------------------
        // Return updated data
        // ------------------------------------------

        return UserMapper.toUserResponse(
                updatedUser
        );
    }


    // ==========================================
    // EXISTING ADMIN PROFILE BY ADMIN ID
    // ==========================================

    public UserResponse getAdminProfile(
            Long adminId
    ) {

        Admin admin =
                adminRepository
                        .findById(adminId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Admin not found with id: "
                                                + adminId
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
    // ADMIN DASHBOARD
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