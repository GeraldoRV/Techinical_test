package com.example.backend.service;

import com.example.backend.dao.RoleDAO;
import com.example.backend.dao.UserDAO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private RoleDAO roleDAO;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserDTO> getAll() {
        List<User> users = (List<User>) userDAO.findAll();
        return convertUsersToDTO(users);
    }

    public UserDTO getUser(Integer id) {
        Optional<User> userFound = userDAO.findById(id);
        if (userFound.isPresent()) {
            User user = userFound.get();
            return convertToDTO(user);
        }
        return null;
    }

    public UserDTO createUser(UserDTO userDTO) {
        User user = givenUserDetails(userDTO);
        User userSave = userDAO.save(user);
        return convertToDTO(userSave);
    }

    public UserDTO loginUser(String name) {
        return convertToDTO(userDAO.findByName(name));
    }

    private List<UserDTO> convertUsersToDTO(List<User> users) {
        ArrayList<UserDTO> usersDTO = new ArrayList<>();
        for (User user :
                users) {
            usersDTO.add(convertToDTO(user));
        }
        return usersDTO;
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

    private User givenUserDetails(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setPassword(passwordEncoder.encode(userDTO.getName()));
        List<String> rolesToADD = userDTO.getRoles();
        addRoles(user, rolesToADD);
        return user;
    }

    private void addRoles(User user, List<String> rolesToADD) {
        Set<Role> userRoles = user.getRoles();
        if (rolesToADD.isEmpty()) {
            setDefaultRole(userRoles);
        } else {
            setRoles(userRoles, rolesToADD);
        }
    }

    private void setDefaultRole(Set<Role> userRoles) {
        Role roleInDB = roleDAO.findByName("standard");
        userRoles.add(roleInDB);
    }

    private void setRoles(Set<Role> userRoles, List<String> rolesToADD) {
        for (String role :
                rolesToADD) {
            Role roleInDB = roleDAO.findByName(role);
            if (roleInDB != null) {
                userRoles.add(roleInDB);
            }
        }
    }
}
