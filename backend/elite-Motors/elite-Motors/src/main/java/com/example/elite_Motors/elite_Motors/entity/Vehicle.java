package com.example.elite_Motors.elite_Motors.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicles")
@Data // Getter, Setter, ToString auto-generate  (Lombok)
@AllArgsConstructor //(Empty) constructor
@NoArgsConstructor//fields (variables) construor
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

    private String imageUrl;
}