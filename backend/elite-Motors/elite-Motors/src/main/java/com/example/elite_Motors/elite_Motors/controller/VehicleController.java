package com.example.elite_Motors.elite_Motors.controller;

import com.example.elite_Motors.elite_Motors.entity.Vehicle;
import com.example.elite_Motors.elite_Motors.service.FileUploadService;
import com.example.elite_Motors.elite_Motors.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin("*")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private FileUploadService fileUploadService;

    // 1. වාහනයක් පින්තූරයත් සමඟ ඇතුළත් කිරීම (Multipart Request)
    @PostMapping("/add")
    public ResponseEntity<Vehicle> addVehicle(
            @RequestParam("image") MultipartFile image,
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("year") int year,
            @RequestParam("price") double price,
            @RequestParam("fuelType") String fuelType,
            @RequestParam("description") String description,
            @RequestParam("status") String status) {

        try {
            // පින්තූරය save කර නම ලබා ගැනීම
            String imageName = fileUploadService.saveImage(image);

            Vehicle vehicle = new Vehicle();
            vehicle.setBrand(brand);
            vehicle.setModel(model);
            vehicle.setYear(year);
            vehicle.setPrice(price);
            vehicle.setFuelType(fuelType);
            vehicle.setDescription(description);
            vehicle.setStatus(status);
            vehicle.setImageUrl(imageName);

            return ResponseEntity.ok(vehicleService.saveVehicle(vehicle));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 2. සියලුම වාහන ලබා ගැනීම
    @GetMapping("/all")
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    // 3. ID එක අනුව වාහනයක් සෙවීම
    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
         return vehicleService.getVehicleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 4. වාහනයක විස්තර වෙනස් කිරීම (Update)
    @PutMapping("/update/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(vehicleService.updateVehicle(id, vehicle));
    }

    // 5. වාහනයක් මකා දැමීම (Delete)
    @DeleteMapping("/delete/{id}")
    public String deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return "Vehicle with ID " + id + " deleted successfully!";
    }
}