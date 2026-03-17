import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-calendar-and-tasks',
  templateUrl: './calendar-and-tasks.page.html',
  styleUrls: ['./calendar-and-tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule]
})
export class CalendarAndTasksPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
