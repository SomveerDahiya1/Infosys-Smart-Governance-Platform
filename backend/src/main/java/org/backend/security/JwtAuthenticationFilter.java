package org.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;


    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService
    ) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader =
                request.getHeader("Authorization");

        System.out.println(
                "AUTH HEADER: " + authHeader
        );


        if (authHeader == null
                || !authHeader.startsWith("Bearer ")) {

            System.out.println(
                    "JWT NOT FOUND"
            );

            filterChain.doFilter(request, response);
            return;
        }


        String jwtToken =
                authHeader.substring(7);

        String userEmail =
                jwtService.extractEmail(jwtToken);

        System.out.println(
                "JWT EMAIL: " + userEmail
        );


        if (userEmail != null
                && SecurityContextHolder
                .getContext()
                .getAuthentication() == null) {

            UserDetails userDetails =
                    userDetailsService
                            .loadUserByUsername(userEmail);


            boolean isValid =
                    jwtService.isTokenValid(
                            jwtToken,
                            userDetails
                    );

            System.out.println(
                    "JWT VALID: " + isValid
            );


            if (isValid) {

                UsernamePasswordAuthenticationToken
                        authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );


                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );


                SecurityContextHolder
                        .getContext()
                        .setAuthentication(
                                authenticationToken
                        );

                System.out.println(
                        "AUTHENTICATION SET SUCCESSFULLY"
                );
            }
        }


        filterChain.doFilter(
                request,
                response
        );
    }
}