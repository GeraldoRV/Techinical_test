package com.example.backend.service;

import com.example.backend.dao.RoleDAO;
import com.example.backend.dao.UserDAO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private RoleDAO roleDAO;

    public List<UserDTO> getAll() {
        List<User> users = (List<User>) userDAO.findAll();
        return convertUsersToDTO(users);
    }

    private List<UserDTO> convertUsersToDTO(List<User> users) {
        ArrayList<UserDTO> usersDTO = new ArrayList<>();
        for (User user :
                users) {
            usersDTO.add(convertToDTO(user));
        }
        return usersDTO;
    }

    public UserDTO getUser(Integer id) {
        Optional<User> userFound = userDAO.findById(id);
        if (userFound.isPresent()) {
            User user = userFound.get();
            return convertToDTO(user);
        }
        return null;
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        for (Role role :
                user.getRoles()) {
            userDTO.addRole(role.getName());
        }
        return userDTO;
    }

    public void createUser(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        List<String> roles = userDTO.getRoles();
        addRoles(user,roles);
        userDAO.save(user);
    }

    private void addRoles(User user, List<String> roles) {
        if (roles.isEmpty()) {
            Role role = new Role();
            role.setId(1);
            Set<Role> rolesSet = new HashSet<>();
            rolesSet.add(role);
            user.setRoles(rolesSet);
        } else {
            Set<Role> userRoles = user.getRoles();
            for (String role :
                    roles) {
                Role roleInDB = roleDAO.findByName(role);
                userRoles.add(roleInDB);
            }
        }
    }
}
