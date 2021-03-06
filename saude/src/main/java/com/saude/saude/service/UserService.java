package com.saude.saude.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saude.saude.model.User;
import com.saude.saude.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	public List<User> getAllUsers(){
		
		return userRepository.findAllUsuarios();
		
	}
	
	public void deleteUser(Long id) {
		this.userRepository.deleteById(id);
	}
	
	public User atualizarUsuario(User user) {
		return this.userRepository.save(user);
	}
}
