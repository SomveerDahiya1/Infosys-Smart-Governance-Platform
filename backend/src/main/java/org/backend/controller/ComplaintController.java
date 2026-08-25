package org.backend.controller;
import org.backend.dto.response.DashboardResponse;
import java.util.List ;
import org.backend.dto.response.ComplaintStatusHistoryResponse;
import java.util.List;
import org.backend.dto.request.AssignComplaintRequest;
import org.backend.dto.request.CreateComplaintRequest;
import org.backend.dto.request.UpdateComplaintRequest;
import org.backend.dto.response.ApiResponse;
import org.backend.dto.response.ComplaintResponse;
import org.backend.service.ComplaintService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {


    private final ComplaintService complaintService;


    public ComplaintController(
            ComplaintService complaintService
    ) {
        this.complaintService = complaintService;
    }
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>>
    getDashboardStatistics() {

        DashboardResponse response =
                complaintService.getDashboardStatistics();

        ApiResponse<DashboardResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Dashboard statistics fetched successfully",
                        response
                );

        return ResponseEntity.ok(
                apiResponse
        );
    }
    @GetMapping("/citizen/{citizenId}")
    public ResponseEntity<
            ApiResponse<List<ComplaintResponse>>
            >
    getComplaintsByCitizen(
            @PathVariable Long citizenId
    ) {

        List<ComplaintResponse> response =
                complaintService.getComplaintsByCitizen(
                        citizenId
                );

        ApiResponse<List<ComplaintResponse>> apiResponse =
                new ApiResponse<>(
                        true,
                        "Citizen complaints fetched successfully",
                        response
                );

        return ResponseEntity.ok(
                apiResponse
        );
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

    @GetMapping("/{complaintId:\\d+}")
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

        return ResponseEntity.ok(
                apiResponse
        );
    }
    @GetMapping("/filter")
    public ResponseEntity<
            ApiResponse<List<ComplaintResponse>>
            >
    filterComplaints(

            @RequestParam(required = false)
            Short statusId,

            @RequestParam(required = false)
            Short priorityId,

            @RequestParam(required = false)
            Long categoryId
    ) {

        List<ComplaintResponse> response =
                complaintService.filterComplaints(
                        statusId,
                        priorityId,
                        categoryId
                );

        ApiResponse<List<ComplaintResponse>> apiResponse =
                new ApiResponse<>(
                        true,
                        "Complaints filtered successfully",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/officer/{officerId}")
    public ResponseEntity<
            ApiResponse<List<ComplaintResponse>>
            >
    getAssignedComplaints(
            @PathVariable Long officerId
    ) {

        List<ComplaintResponse> response =
                complaintService.getAssignedComplaints(
                        officerId
                );

        ApiResponse<List<ComplaintResponse>>
                apiResponse =
                new ApiResponse<>(
                        true,
                        "Assigned complaints fetched successfully",
                        response
                );

        return ResponseEntity.ok(
                apiResponse
        );
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

        return ResponseEntity.ok(
                apiResponse
        );
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

        return ResponseEntity.ok(
                apiResponse
        );
    }

    @GetMapping("/{complaintId}/history")
    public ResponseEntity<
            ApiResponse<List<ComplaintStatusHistoryResponse>>
            >
    getComplaintStatusHistory(
            @PathVariable Long complaintId
    ) {

        List<ComplaintStatusHistoryResponse> response =
                complaintService.getComplaintStatusHistory(
                        complaintId
                );

        ApiResponse<List<ComplaintStatusHistoryResponse>>
                apiResponse =
                new ApiResponse<>(
                        true,
                        "Complaint status history fetched successfully",
                        response
                );

        return ResponseEntity.ok(
                apiResponse
        );
    }
}