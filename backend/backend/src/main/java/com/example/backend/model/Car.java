package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String model;
    private Integer year;
    private String price;
    private String fuel;

    @Column(length = 1000)
    private String image;

    @Column(length = 2000)
    private String description;

    private String mileage;
    private String transmission;
    private String status;
    private Boolean certified;

    // මෙන්න මේ පේළිය තමයි වෙනස් කළේ
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> features;
}