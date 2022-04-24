import { Component } from '@angular/core';
import { faAmbulance } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hk-wordle';
  amb = faAmbulance;
}
