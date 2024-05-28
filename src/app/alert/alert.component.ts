import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: string | undefined;
  type: string | undefined;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.onAlert().subscribe(({ message, type }) => {
      this.message = message;
      this.type = type;
    });
  }

  hideAlert() {
    this.alertService.hideAlert();
  }
}
