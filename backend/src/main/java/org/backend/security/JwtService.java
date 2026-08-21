package org.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.backend.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;


    public String generateToken(User user) {

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("userId", user.getUserId())
                .claim("role", user.getRole().getRoleName())
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + jwtExpiration
                        )
                )
                .signWith(getSigningKey())
                .compact();
    }


    public String extractEmail(String token) {

        return extractAllClaims(token)
                .getSubject();
    }


    public Long extractUserId(String token) {

        Number userId =
                extractAllClaims(token)
                        .get("userId", Number.class);

        return userId.longValue();
    }


    public String extractRole(String token) {

        return extractAllClaims(token)
                .get("role", String.class);
    }


    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ) {

        String email = extractEmail(token);

        return email.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }


    private boolean isTokenExpired(String token) {

        Date expiration =
                extractAllClaims(token)
                        .getExpiration();

        return expiration.before(new Date());
    }


    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }


    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                jwtSecret.getBytes()
        );
    }

}