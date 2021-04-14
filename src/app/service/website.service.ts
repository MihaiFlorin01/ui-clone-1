import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  private runningSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public running = this.runningSubject.asObservable();

  setRunning = (value: boolean) => {
    this.runningSubject.next(value);
  }
}
