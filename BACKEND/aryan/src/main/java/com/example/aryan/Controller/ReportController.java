package com.example.aryan.Controller;

import com.example.aryan.Model.Report;
import com.example.aryan.Service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class ReportController {

    @Autowired
    private ReportService reportService;

    // 🔹 POST - Create a new report
    @PostMapping
    public Report createReport(@RequestBody Report report) {
        return reportService.createReport(report);
    }

    // 🔹 GET - All reports
    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    // 🔹 GET - Reports created by a user
    @GetMapping("/from/{email}")
    public List<Report> getReportsFrom(@PathVariable String email) {
        return reportService.getReportsFrom(email);
    }

    // 🔹 GET - Reports against a user
    @GetMapping("/to/{email}")
    public List<Report> getReportsTo(@PathVariable String email) {
        return reportService.getReportsTo(email);
    }

    // 🔹 PUT - Resolve a report
    @PutMapping("/{id}/resolve")
    public Report resolveReport(@PathVariable Long id, @RequestParam String remarks) {
        return reportService.resolveReport(id, remarks);
    }

    // 🔹 GET - Unresolved reports
    @GetMapping("/unresolved")
    public List<Report> getUnresolvedReports() {
        return reportService.getUnresolvedReports();
    }
}
