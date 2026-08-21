package org.backend.controller;

import org.backend.dto.response.ApiResponse;
import org.backend.dto.response.ComplaintResponse;
import org.backend.dto.response.DashboardResponse;
import org.backend.dto.response.UserResponse;
import org.backend.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
public class AdminController {


    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }


    @GetMapping("/{adminId}/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getAdminProfile(
            @PathVariable Long adminId
    ) {

        UserResponse response =
                adminService.getAdminProfile(adminId);

        ApiResponse<UserResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Admin profile fetched successfully",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }


    @GetMapping("/complaints")
    public ResponseEntity<ApiResponse<List<ComplaintResponse>>>
    getAllComplaints() {

        List<ComplaintResponse> complaints =
                adminService.getAllComplaints();

        ApiResponse<List<ComplaintResponse>> apiResponse =
                new ApiResponse<>(
                        true,
                        "All complaints fetched successfully",
                        complaints
                );

        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>>
    getDashboardStatistics() {
        DashboardResponse response =
                adminService.getDashboardStatistics();

        ApiResponse<DashboardResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Dashboard statistics fetched successfully",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }


}
