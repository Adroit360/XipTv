import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as applicationModule from "tns-core-modules/application";

declare var UIKeyboardFrameEndUserInfoKey: any;
declare var UIKeyboardWillChangeFrameNotification: any;

@Injectable({
  providedIn: 'root'
})
export class KeyboardObserver {

  constructor() { 
   }

  public heightChange$(): BehaviorSubject<number> {
    return Observable.create((observer) => {
      const iosObserver = applicationModule.ios.addNotificationObserver(UIKeyboardWillChangeFrameNotification, (notification) => {
        const safeArea = applicationModule.ios.window.safeAreaInsets.bottom;
        const height = notification.userInfo.valueForKey(UIKeyboardFrameEndUserInfoKey).CGRectValue.size.height;
        observer.next(height - safeArea);
      });
      return () => {
        applicationModule.ios.removeNotificationObserver(iosObserver, UIKeyboardWillChangeFrameNotification);
      }
    });
  }

}