package org.backend.controller;

import org.backend.dto.response.OfficerResponse;
import org.backend.dto.response.ApiResponse;
import org.backend.dto.response.ComplaintResponse;
import org.backend.dto.response.UserResponse;
import org.backend.service.OfficerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/officers")
public class OfficerController {


    private final OfficerService officerService;


    public OfficerController(
            OfficerService officerService
    ) {
        this.officerService = officerService;
    }


    // ==========================================
    // GET ALL OFFICERS + WORKLOAD
    // ==========================================

    @GetMapping
    public ResponseEntity<ApiResponse<List<OfficerResponse>>>
    getAllOfficers() {

        List<OfficerResponse> officers =
                officerService.getAllOfficers();


        ApiResponse<List<OfficerResponse>> apiResponse =
                new ApiResponse<>(
                        true,
                        "Officers fetched successfully",
                        officers
                );


        return ResponseEntity.ok(
                apiResponse
        );
    }


    // ==========================================
    // GET OFFICER PROFILE
    // ==========================================

    @GetMapping("/{officerId}/profile")
    public ResponseEntity<ApiResponse<UserResponse>>
    getOfficerProfile(
            @PathVariable Long officerId
    ) {

        UserResponse response =
                officerService.getOfficerProfile(
                        officerId
                );


        ApiResponse<UserResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Officer profile fetched successfully",
                        response
                );


        return ResponseEntity.ok(
                apiResponse
        );
    }


    // ==========================================
    // GET ASSIGNED COMPLAINTS
    // ==========================================

    @GetMapping("/{officerId}/complaints")
    public ResponseEntity<
            ApiResponse<List<ComplaintResponse>>
            >
    getAssignedComplaints(
            @PathVariable Long officerId
    ) {

        List<ComplaintResponse> complaints =
                officerService.getAssignedComplaints(
                        officerId
                );


        ApiResponse<List<ComplaintResponse>> apiResponse =
                new ApiResponse<>(
                        true,
                        "Assigned complaints fetched successfully",
                        complaints
                );


        return ResponseEntity.ok(
                apiResponse
        );
    }
}