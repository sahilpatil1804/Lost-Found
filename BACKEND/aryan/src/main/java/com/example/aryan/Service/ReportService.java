package com.example.aryan.Service;

import com.example.aryan.Model.Login;
import com.example.aryan.Model.Report;
import com.example.aryan.Repository.LoginRepository;
import com.example.aryan.Repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private LoginRepository loginRepository;

    public Report createReport(Report report) {
        report.setReportDate(Date.valueOf(LocalDate.now()));
        report.setReportTime(Time.valueOf(LocalTime.now()));
        report.setStatus("open");
        return reportRepository.save(report);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public List<Report> getReportsFrom(String email) {
        Optional<Login> login = loginRepository.findById(email);
        return login.map(reportRepository::findByReportFrom).orElse(List.of());
    }

    public List<Report> getReportsTo(String email) {
        Optional<Login> login = loginRepository.findById(email);
        return login.map(reportRepository::findByReportTo).orElse(List.of());
    }

    public Report resolveReport(Long id, String remarks) {
        Report report = reportRepository.findById(id).orElseThrow();
        report.setReportSolved(true);
        report.setStatus("closed");
        report.setAdminRemarks(remarks);
        return reportRepository.save(report);
    }

    public List<Report> getUnresolvedReports() {
        return reportRepository.findByReportSolved(false);
    }

    public Optional<Report> getReportById(Long id) {
        return reportRepository.findById(id);
    }
}

