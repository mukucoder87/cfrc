package com.example.researchform;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/research-questions")
@CrossOrigin(origins = "*")
public class ResearchQuestionController {

    private final ResearchQuestionRepository repository;

    public ResearchQuestionController(ResearchQuestionRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<ResearchQuestion> create(@Valid @RequestBody ResearchQuestion payload) {
        ResearchQuestion saved = repository.save(payload);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public List<ResearchQuestion> findAll() {
        return repository.findAll();
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        return response;
    }
}
