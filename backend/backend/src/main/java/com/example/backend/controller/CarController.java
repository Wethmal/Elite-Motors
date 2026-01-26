package com.example.backend.controller;

import com.example.backend.model.Car;
import com.example.backend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin("*") 
public class CarController {

    @Autowired
    private CarRepository carRepository;

   
    @PostMapping("/add")
    public Car addCar(@RequestBody Car car) {
        return carRepository.save(car);
    }

    
    @GetMapping("/all")
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

   
    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carRepository.findById(id).orElse(null);
    }

   
    @PutMapping("/update/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        Car car = carRepository.findById(id).orElse(null);
        if (car != null) {
           
            car.setBrand(carDetails.getBrand());
            car.setModel(carDetails.getModel());
            car.setYear(carDetails.getYear());
            car.setPrice(carDetails.getPrice());
            car.setFuel(carDetails.getFuel());
            car.setImage(carDetails.getImage());
            car.setDescription(carDetails.getDescription());
            car.setMileage(carDetails.getMileage());
            car.setTransmission(carDetails.getTransmission());
            car.setStatus(carDetails.getStatus());
            car.setCertified(carDetails.getCertified());
            car.setFeatures(carDetails.getFeatures());

            return carRepository.save(car);
        }
        return null;
    }

  
    @DeleteMapping("/delete/{id}")
    public String deleteCar(@PathVariable Long id) {
        carRepository.deleteById(id);
        return "Car deleted successfully!";
    }
}
