package com.example.backend.service;

import com.example.backend.dao.UserDAO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserDAO userDAO;

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

    public void createUser(User user) {
        List<Role> roles = user.getRoles();
        if (roles.isEmpty()){
            Role role = new Role();
            role.setId(1);
            roles.add(role);
        }
        userDAO.save(user);
    }
}
