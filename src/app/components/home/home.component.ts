import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var locacion = location.pathname;
    if(locacion.indexOf('fabrica/restablecer-contra')>=0) {

    }
  }

}
