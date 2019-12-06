package com.example.backend.service;
/*

import com.example.backend.dao.UserDAO;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
*/

//@Service("userDetailsService")
public class MyUserDetailsService /*implements UserDetailsService*/ {
   /* @Autowired
    private UserDAO userDAO;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        User user = userDAO.findByName(name);
        List<GrantedAuthority> authorities = userAuthority(user.getRoles());
        return userForAuthentication(user, authorities);
    }

    private org.springframework.security.core.userdetails.User userForAuthentication(User user, List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(), authorities);
    }

    private List<GrantedAuthority> userAuthority(Set<Role> roles) {
        HashSet<GrantedAuthority> authorities = new HashSet<>();
        for (Role role :
                roles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return new ArrayList<>(authorities);
    }*/
}
