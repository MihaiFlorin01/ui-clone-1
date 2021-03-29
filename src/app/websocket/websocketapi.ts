import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AppComponent} from '../app.component';
import {WebsiteService} from "../service/websiteservice";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class WebSocketAPI {

  webSocketEndPoint = 'http://localhost:8082/ws';
  stompClient: any;
  value = false;
  topic = '/topic/greetings';
  result = '';
  constructor(private websiteService: WebsiteService) {
    // console.log("started");
  }

  // public topic = this.clone1Service.getCloneStatus().subscribe(res => {
  //   console.log(res);
  // });

  // public topic = this.clone1Service.getCloneStatus().subscribe();

  connect(): any {
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const that = this;
    that.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe(that.topic, sdkEvent =>{
        console.log('!', JSON.parse(sdkEvent.body));
        that.onMessageReceived(sdkEvent);
      });
    });
  }


  // connect(): any {
  //   const ws = new SockJS(this.webSocketEndPoint);
  //   this.stompClient = Stomp.over(ws);
  //   const that = this;
  //   that.stompClient.connect({}, function(frame) {
  //     that.stompClient.subscribe(that.topic, function (sdkEvent) {
  //       console.log('!', JSON.parse(sdkEvent.body));
  //       that.onMessageReceived(sdkEvent);
  //     });
  //   });
  // }
  disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  errorCallBack(error): void {
    console.log('errorCallBack -> ' + error)
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  onMessageReceived(message): void {
    // if(JSON.parse(sdkEvent.body) !== undefined && JSON.parse(sdkEvent.body) !== null) {
      this.result = JSON.stringify(message.body);
    // }
    console.log('Message received from Server :: ' + message);
    this.result = message.body;
    console.log('1111111' + message.body);
    this.websiteService.setRunning(message.body);
    // this.appComponent.handleMessage(message.body);
  }
}
