package org.backend.controller;

import org.backend.dto.request.AssignComplaintRequest;
import org.backend.dto.request.CreateComplaintRequest;
import org.backend.dto.request.UpdateComplaintRequest;
import org.backend.dto.response.ApiResponse;
import org.backend.dto.response.ComplaintResponse;
import org.backend.service.ComplaintService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {


    private final ComplaintService complaintService;


    public ComplaintController(
            ComplaintService complaintService
    ) {
        this.complaintService = complaintService;
    }


    @PostMapping("/citizen/{citizenId}")
    public ResponseEntity<ApiResponse<ComplaintResponse>>
    createComplaint(
            @PathVariable Long citizenId,
            @RequestBody CreateComplaintRequest request
    ) {

        ComplaintResponse response =
                complaintService.createComplaint(
                        citizenId,
                        request
                );

        ApiResponse<ComplaintResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Complaint created successfully",
                        response
                );

        return new ResponseEntity<>(
                apiResponse,
                HttpStatus.CREATED
        );
    }


    @GetMapping("/{complaintId}")
    public ResponseEntity<ApiResponse<ComplaintResponse>>
    getComplaintById(
            @PathVariable Long complaintId
    ) {

        ComplaintResponse response =
                complaintService.getComplaintById(
                        complaintId
                );

        ApiResponse<ComplaintResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Complaint fetched successfully",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }


    @PutMapping("/{complaintId}/user/{userId}")
    public ResponseEntity<ApiResponse<ComplaintResponse>>
    updateComplaint(
            @PathVariable Long complaintId,
            @PathVariable Long userId,
            @RequestBody UpdateComplaintRequest request
    ) {

        ComplaintResponse response =
                complaintService.updateComplaint(
                        complaintId,
                        userId,
                        request
                );

        ApiResponse<ComplaintResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Complaint updated successfully",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }


    @PostMapping("/{complaintId}/assign/admin/{adminUserId}")
    public ResponseEntity<ApiResponse<ComplaintResponse>>
    assignComplaint(
            @PathVariable Long complaintId,
            @PathVariable Long adminUserId,
            @RequestBody AssignComplaintRequest request
    ) {

        ComplaintResponse response =
                complaintService.assignComplaint(
                        complaintId,
                        adminUserId,
                        request
                );

        ApiResponse<ComplaintResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Complaint assigned successfully",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }


}
