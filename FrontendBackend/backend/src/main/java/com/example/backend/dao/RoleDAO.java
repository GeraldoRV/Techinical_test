package com.example.backend.dao;

import com.example.backend.model.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleDAO extends CrudRepository<Role, Integer> {
     Role findByName(String name);
}
