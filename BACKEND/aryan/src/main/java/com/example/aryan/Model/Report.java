package com.example.aryan.Model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Time;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "report_from", referencedColumnName = "email")
    private Login reportFrom;

    @ManyToOne
    @JoinColumn(name = "report_to", referencedColumnName = "email")
    private Login reportTo;

    private Date reportDate;
    private Time reportTime;

    @Column(name = "report_reason", length = 1000)
    private String reportReason;

    @Column(name = "report_solved")
    private boolean reportSolved = false;

    private Integer itemId;
    private String itemType; 

    @Column(length = 1000)
    private String adminRemarks;

    private String status; 
}

