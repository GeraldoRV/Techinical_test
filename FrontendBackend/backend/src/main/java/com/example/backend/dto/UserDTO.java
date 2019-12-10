package com.example.backend.dto;

import java.util.ArrayList;
import java.util.List;

public class UserDTO {
    private Integer id;
    private String name;
    private List<String> roles;

    public UserDTO() {
        roles = new ArrayList<>();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public void addRole(String role){
        roles.add(role);
    }
}
