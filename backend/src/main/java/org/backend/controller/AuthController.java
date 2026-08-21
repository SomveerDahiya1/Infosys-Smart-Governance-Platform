package org.backend.controller;

import org.backend.dto.request.LoginRequest;
import org.backend.dto.request.RegisterRequest;
import org.backend.dto.response.ApiResponse;
import org.backend.dto.response.AuthResponse;
import org.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @RequestBody RegisterRequest request
    ) {

        AuthResponse response =
                authService.register(request);

        ApiResponse<AuthResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "User registered successfully",
                        response
                );

        return new ResponseEntity<>(
                apiResponse,
                HttpStatus.CREATED
        );
    }


    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @RequestBody LoginRequest request
    ) {

        AuthResponse response =
                authService.login(request);

        ApiResponse<AuthResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Login successful",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }


}
