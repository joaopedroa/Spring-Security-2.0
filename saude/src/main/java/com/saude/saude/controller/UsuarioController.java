package com.saude.saude.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saude.saude.model.User;
import com.saude.saude.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UsuarioController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/getAllUsers")
	public ResponseEntity<List<User>> findAllUsers() {
		
		List<User> todosUsuarios = userService.getAllUsers();
		
		return new  ResponseEntity<List<User>>(todosUsuarios, HttpStatus.OK);
		
	}

}
