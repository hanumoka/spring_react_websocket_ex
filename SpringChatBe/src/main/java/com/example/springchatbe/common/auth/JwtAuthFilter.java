package com.example.springchatbe.common.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Override
    protected void doFilterInternal
            (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        String token = httpServletRequest.getHeader("Authorization");

        try {
            if (token != null) {
                if (!token.substring(0, 7).equals("Bearer ")) {
                    throw new AuthenticationServiceException("Bearer 형식 아님");
                }//if

                String jwtToken = token.substring(7);

                // 토큰 검증 및 claims 추출
                // secretKey가 Base64 인코딩된 문자열인 경우
                byte[] keyBytes = Base64.getDecoder().decode(secretKey);
                SecretKey key = Keys.hmacShaKeyFor(keyBytes);
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(jwtToken)
                        .getBody();

                // Authentication 객체 생성
                List<GrantedAuthority> authorities = new ArrayList<>();
                authorities.add(new SimpleGrantedAuthority("ROLE_" + claims.get("role"))); // ROLE_ 접두사는 spring security 관례
                UserDetails userDetails = new User(claims.getSubject(), "", authorities);
                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }//if


            filterChain.doFilter(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            // 예외 발생 시 인증 실패 처리
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpServletResponse.setContentType("application/json;charset=utf-8");
            httpServletResponse.getWriter().write("Unauthorized: " + e.getMessage());
        }


    }
}
