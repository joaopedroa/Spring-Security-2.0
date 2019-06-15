import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router:Router, private _service:ServiceService) { }

  ngOnInit() {
  }

  public signout(){
    localStorage.removeItem("token");
    this._router.navigate(['']);
  }

  hidden(){
    return !!this._service.loggedIn();
  }

}
