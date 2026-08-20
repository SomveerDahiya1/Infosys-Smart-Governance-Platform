package org.backend.exception;

import org.backend.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFoundException(
            ResourceNotFoundException exception
    ) {

        ApiResponse<Void> response =
                new ApiResponse<>(
                        false,
                        exception.getMessage(),
                        null
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.NOT_FOUND
        );
    }


    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse<Void>> handleUnauthorizedException(
            UnauthorizedException exception
    ) {

        ApiResponse<Void> response =
                new ApiResponse<>(
                        false,
                        exception.getMessage(),
                        null
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.FORBIDDEN
        );
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneralException(
            Exception exception
    ) {

        ApiResponse<Void> response =
                new ApiResponse<>(
                        false,
                        "Something went wrong",
                        null
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

}