import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommunicationService } from '../app-common/communication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  constructor(
    public communicator: CommunicationService,
  ) { }

  ngOnInit() {
  }

}
