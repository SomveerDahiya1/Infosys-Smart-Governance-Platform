package org.backend.controller;

import org.backend.dto.response.ApiResponse;
import org.backend.dto.response.ComplaintResponse;
import org.backend.dto.response.UserResponse;
import org.backend.service.CitizenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citizens")
public class CitizenController {

    private final CitizenService citizenService;


    public CitizenController(
            CitizenService citizenService
    ) {
        this.citizenService = citizenService;
    }


    @GetMapping("/{citizenId}/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getCitizenProfile(
            @PathVariable Long citizenId
    ) {

        UserResponse response =
                citizenService.getCitizenProfile(citizenId);

        ApiResponse<UserResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Citizen profile fetched successfully",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }


    @GetMapping("/{citizenId}/complaints")
    public ResponseEntity<ApiResponse<List<ComplaintResponse>>>
    getCitizenComplaints(
            @PathVariable Long citizenId
    ) {

        List<ComplaintResponse> complaints =
                citizenService.getCitizenComplaints(citizenId);

        ApiResponse<List<ComplaintResponse>> apiResponse =
                new ApiResponse<>(
                        true,
                        "Citizen complaints fetched successfully",
                        complaints
                );

        return ResponseEntity.ok(apiResponse);
    }

}