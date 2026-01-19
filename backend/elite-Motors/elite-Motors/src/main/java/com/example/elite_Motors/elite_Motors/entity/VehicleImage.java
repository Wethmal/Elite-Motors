package com.example.elite_Motors.elite_Motors.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VehicleImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    @JsonIgnore // Response එකේදී loop එකක් නොවී ඉන්න මේක ඕනේ
    private Vehicle vehicle;
}