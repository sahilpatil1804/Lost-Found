package com.example.aryan.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.aryan.Model.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, String> {
    Login findByUsername(String username);
    Login findByEmail(String email); 
}
