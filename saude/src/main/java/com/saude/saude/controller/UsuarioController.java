package com.saude.saude.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saude.saude.message.request.LoginForm;
import com.saude.saude.model.Role;
import com.saude.saude.model.RoleName;
import com.saude.saude.model.User;
import com.saude.saude.repository.RoleRepository;
import com.saude.saude.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UsuarioController {
	
	@Autowired
	UserService userService;
	
	@Autowired
    RoleRepository roleRepository;
	
	@Autowired
    PasswordEncoder encoder;
	
	@GetMapping("/getAllUsers")
	public ResponseEntity<List<User>> findAllUsers() {
		
		List<User> todosUsuarios = userService.getAllUsers();
		
		return new  ResponseEntity<List<User>>(todosUsuarios, HttpStatus.OK);
		
	}
	
	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<Void> deletarUsuario(@PathVariable("id") Long id) {
		userService.deleteUser(id);
		 return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PutMapping("/atualizaruser")
	public ResponseEntity<User> atualizarUsuario(@Valid @RequestBody User usuario) {
		Set<Role> roles = new HashSet<>();
		Role role = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
		roles.add(role);
		usuario.setRoles(roles);
		usuario.setPassword(encoder.encode(usuario.getPassword()));
		User userAtualizado = userService.atualizarUsuario(usuario);
		return new ResponseEntity<User>(userAtualizado,HttpStatus.OK);
	}

}
