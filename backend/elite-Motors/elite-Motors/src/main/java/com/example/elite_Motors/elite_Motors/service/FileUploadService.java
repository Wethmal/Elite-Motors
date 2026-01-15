package com.example.elite_Motors.elite_Motors.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileUploadService {

    // පින්තූර save කරන folder එකේ path එක
    private final String uploadDir = "uploads/";

    public String saveImage(MultipartFile file) throws IOException {
        // Folder එක නැත්නම් හදනවා
        Path path = Paths.get(uploadDir);
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }

        // පින්තූරයේ නම unique කරන්න (උදා: 7d8f9-car.jpg)
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = path.resolve(fileName);

        // File එක save කරනවා
        Files.copy(file.getInputStream(), filePath);

        return fileName; // පස්සේ database එකේ දාන්න මේ නම return කරනවා
    }
}