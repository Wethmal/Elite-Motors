package com.example.elite_Motors.elite_Motors.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// වැදගත්: java.util.List පාවිච්චි කරන්න
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vehicles")
@Data
@AllArgsConstructor // සියලුම fields සහිත constructor එක
@NoArgsConstructor  // හිස් (default) constructor එක
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String model;
    private int year;
    private double price;
    private String fuelType;

    @Column(length = 1000)
    private String description;

    private String status; // Available or Sold

    // One-to-Many Relationship: එක වාහනයකට පින්තූර කිහිපයක්
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VehicleImage> images = new ArrayList<>();
}