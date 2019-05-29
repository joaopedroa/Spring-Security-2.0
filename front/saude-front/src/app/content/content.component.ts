import { Component, OnInit } from '@angular/core';
import  Typed from 'typed.js';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor() {
   
   }

  ngOnInit() {
    const options = {
      stringsElement: '#typed-strings',
      strings: ['Saúde', 'Sua saúde em primeiro lugar', 'Contate-nos'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 200,
      smartBackspace: true,
      fadeOut: true,
      showCursor: false,
      startDelay: 1000,
      loop: true
      };
      
      const typed = new Typed('.typing-element', options);
  }

  

}
