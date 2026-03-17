import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-modo-estudio',
  templateUrl: './modo-estudio.page.html',
  styleUrls: ['./modo-estudio.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule]
})
export class ModoEstudioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
