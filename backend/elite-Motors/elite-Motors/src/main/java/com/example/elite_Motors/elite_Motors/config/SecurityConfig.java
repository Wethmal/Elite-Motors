package com.example.elite_Motors.elite_Motors.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Postman එකෙන් data යවද්දී block නොවී ඉන්න මේක ඕනේ
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/vehicles/**").permitAll() // Vehicles වලට අදාළ APIs වලට ඕනෑම කෙනෙක්ට අවසර දෙනවා
                        .anyRequest().authenticated() // අනිත් request වලට login වෙන්න ඕනේ
                );

        return http.build();
    }
}