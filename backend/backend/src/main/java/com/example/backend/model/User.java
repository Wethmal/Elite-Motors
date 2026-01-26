package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users") // Maps this class to the 'users' table in the database
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary Key

    @Column(unique = true) // Username must be unique in the database
    private String username;

    private String password; // Stores the user's password

    private String role; // Role of the user (e.g., "ADMIN", "USER")
}