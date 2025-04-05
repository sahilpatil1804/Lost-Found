package com.example.aryan.Repository;

import com.example.aryan.Model.Login;
import com.example.aryan.Model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByReportFrom(Login reportFrom);
    List<Report> findByReportTo(Login reportTo);
    List<Report> findByReportSolved(boolean reportSolved);
}
