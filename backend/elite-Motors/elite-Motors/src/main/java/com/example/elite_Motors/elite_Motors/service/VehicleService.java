package com.example.elite_Motors.elite_Motors.service;

import com.example.elite_Motors.elite_Motors.entity.Vehicle;
import com.example.elite_Motors.elite_Motors.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    // 1. වාහනයක් save කිරීම
    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    // 2. සියලුම වාහන ලබා ගැනීම
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // 3. ID එක මගින් වාහනයක් සෙවීම
    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    // 4. වාහනයක විස්තර Update කිරීම
    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicle.setBrand(updatedVehicle.getBrand());
            vehicle.setModel(updatedVehicle.getModel());
            vehicle.setYear(updatedVehicle.getYear());
            vehicle.setPrice(updatedVehicle.getPrice());
            vehicle.setFuelType(updatedVehicle.getFuelType());
            vehicle.setDescription(updatedVehicle.getDescription());
            vehicle.setStatus(updatedVehicle.getStatus());
            // පින්තූරය වෙනස් කරනවා නම් පමණක් imageUrl එක update කරන්න
            if (updatedVehicle.getImageUrl() != null) {
                vehicle.setImageUrl(updatedVehicle.getImageUrl());
            }
            return vehicleRepository.save(vehicle);
        }).orElseThrow(() -> new RuntimeException("Vehicle not found with id " + id));
    }

    // 5. වාහනයක් Delete කිරීම
    public void deleteVehicle(Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
        } else {
            throw new RuntimeException("Vehicle not found with id " + id);
        }
    }
}