package org.backend.service;

import org.backend.dto.request.LoginRequest;
import org.backend.dto.request.RegisterRequest;
import org.backend.dto.response.AuthResponse;
import org.backend.entity.Citizen;
import org.backend.entity.Role;
import org.backend.entity.User;
import org.backend.exception.ResourceNotFoundException;
import org.backend.repository.CitizenRepository;
import org.backend.repository.RoleRepository;
import org.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CitizenRepository citizenRepository;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            CitizenRepository citizenRepository
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.citizenRepository = citizenRepository;
    }


    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException(
                    "Email already exists"
            );
        }

        Role role = roleRepository
                .findByRoleName(request.getRole())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Role not found"
                        )
                );

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        user.setPasswordHash(request.getPassword());

        user.setPhoneNumber(request.getPhoneNumber());

        user.setRole(role);

        user.setIsActive(true);

        user = userRepository.save(user);


        if ("CITIZEN".equals(role.getRoleName())) {

            Citizen citizen = new Citizen();

            citizen.setUser(user);

            citizenRepository.save(citizen);
        }


        AuthResponse response = new AuthResponse();

        response.setUserId(user.getUserId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setRole(role.getRoleName());

        return response;
    }


    public AuthResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        if (!user.getPasswordHash().equals(request.getPassword())) {
            throw new IllegalArgumentException(
                    "Invalid password"
            );
        }


        AuthResponse response = new AuthResponse();

        response.setUserId(user.getUserId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());

        if (user.getRole() != null) {
            response.setRole(
                    user.getRole().getRoleName()
            );
        }

        return response;
    }

}