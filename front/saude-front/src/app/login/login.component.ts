import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String;
  password:String;

  constructor(public srv :ServicesService, public router:Router) { }

  ngOnInit() {
  }

  login(){    
    this.srv.signIn(this.username,this.password).subscribe(data =>{
      localStorage.setItem("token", data["tokenType"] + " " + data["accessToken"] );
      this.router.navigate(["home"]);
    });
  }

}
