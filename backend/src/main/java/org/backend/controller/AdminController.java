package org.backend.controller;

import org.backend.dto.request.UpdateProfileRequest;

import org.backend.dto.response.ApiResponse;
import org.backend.dto.response.ComplaintResponse;
import org.backend.dto.response.DashboardResponse;
import org.backend.dto.response.UserResponse;

import org.backend.service.AdminService;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;


    public AdminController(
            AdminService adminService
    ) {
        this.adminService = adminService;
    }


    // ==========================================
    // GET LOGGED-IN ADMIN PROFILE
    // ==========================================

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>>
    getAdminProfile(
            Authentication authentication
    ) {

        String email =
                authentication.getName();


        UserResponse response =
                adminService.getAdminProfileByEmail(
                        email
                );


        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Admin profile fetched successfully",
                        response
                )
        );
    }


    // ==========================================
    // UPDATE LOGGED-IN ADMIN PROFILE
    // ==========================================

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>>
    updateAdminProfile(
            Authentication authentication,
            @RequestBody UpdateProfileRequest request
    ) {

        String email =
                authentication.getName();


        UserResponse response =
                adminService.updateAdminProfile(
                        email,
                        request
                );


        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Admin profile updated successfully",
                        response
                )
        );
    }


    // ==========================================
    // GET ALL COMPLAINTS
    // ==========================================

    @GetMapping("/complaints")
    public ResponseEntity<
            ApiResponse<List<ComplaintResponse>>
            >
    getAllComplaints() {

        List<ComplaintResponse> complaints =
                adminService.getAllComplaints();


        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "All complaints fetched successfully",
                        complaints
                )
        );
    }


    // ==========================================
    // ADMIN DASHBOARD
    // ==========================================

    @GetMapping("/dashboard")
    public ResponseEntity<
            ApiResponse<DashboardResponse>
            >
    getDashboardStatistics() {

        DashboardResponse response =
                adminService.getDashboardStatistics();


        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Dashboard statistics fetched successfully",
                        response
                )
        );
    }
}