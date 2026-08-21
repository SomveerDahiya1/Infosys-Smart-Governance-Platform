package org.backend.exception;

import org.backend.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(
            ResourceNotFoundException exception
    ) {

        ApiResponse<Object> response =
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
    public ResponseEntity<ApiResponse<Object>> handleUnauthorizedException(
            UnauthorizedException exception
    ) {

        ApiResponse<Object> response =
                new ApiResponse<>(
                        false,
                        exception.getMessage(),
                        null
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.UNAUTHORIZED
        );
    }


    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Object>> handleIllegalArgumentException(
            IllegalArgumentException exception
    ) {

        ApiResponse<Object> response =
                new ApiResponse<>(
                        false,
                        exception.getMessage(),
                        null
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGeneralException(
            Exception exception
    ) {

        ApiResponse<Object> response =
                new ApiResponse<>(
                        false,
                        exception.getMessage(),
                        null
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }


}
