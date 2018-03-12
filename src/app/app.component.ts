import { Component } from '@angular/core';
import { CommunicationService } from './app-common/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public communicator: CommunicationService,
  ) { }

}
