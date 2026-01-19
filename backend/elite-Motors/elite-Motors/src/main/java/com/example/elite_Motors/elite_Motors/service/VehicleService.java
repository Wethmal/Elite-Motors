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

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    // මෙන්න මෙතන තමයි error එක තිබුණේ - දැන් මේක නිවැරදියි
    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicle.setBrand(updatedVehicle.getBrand());
            vehicle.setModel(updatedVehicle.getModel());
            vehicle.setYear(updatedVehicle.getYear());
            vehicle.setPrice(updatedVehicle.getPrice());
            vehicle.setFuelType(updatedVehicle.getFuelType());
            vehicle.setDescription(updatedVehicle.getDescription());
            vehicle.setStatus(updatedVehicle.getStatus());

            // පින්තූර list එක update කරනවා නම් මෙහෙම කරන්න පුළුවන්
            if (updatedVehicle.getImages() != null && !updatedVehicle.getImages().isEmpty()) {
                vehicle.setImages(updatedVehicle.getImages());
            }

            return vehicleRepository.save(vehicle);
        }).orElseThrow(() -> new RuntimeException("Vehicle not found with id " + id));
    }

    public void deleteVehicle(Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
        } else {
            throw new RuntimeException("Vehicle not found with id " + id);
        }
    }
}