import {OnInit, SecurityContext} from '@angular/core';
import {WebSocket} from './websocket/websocket';
import {WebsiteService} from './service/website.service';
import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  greeting: boolean;
  value: string;
  constructor(private websiteService: WebsiteService, private webSocket: WebSocket, private sanitizer: DomSanitizer) {
    this.webSocket.connect();
  }

  ngOnInit(): void {
    this.websiteService.running.subscribe((isRunning) => {
      this.greeting = isRunning;
      this.value = this.sanitizer.sanitize(SecurityContext.NONE, this.greeting.toString());
    });
  }
}
