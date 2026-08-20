package org.backend.mapper;

import org.backend.dto.response.UserResponse;
import org.backend.entity.User;

public class UserMapper {

    public static UserResponse toUserResponse(User user) {

        if (user == null) {
            return null;
        }

        UserResponse response = new UserResponse();

        response.setUserId(user.getUserId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhoneNumber());

        if (user.getRole() != null) {
            response.setRole(user.getRole().getRoleName());
        }

        response.setIsActive(user.getIsActive());

        return response;
    }

}