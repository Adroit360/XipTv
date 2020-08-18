import { Toasty, ToastDuration, ToastPosition } from "nativescript-toasty";
import { Color } from "tns-core-modules/color/color";
import { alert,confirm } from "tns-core-modules/ui/dialogs/dialogs";
import { API } from "../helpers/API";
import { JsonPipe } from "@angular/common";
require('../helpers/base64');
export class MiscService {

  showToast(message) {
    new Toasty({ text: message })
      .setToastDuration(ToastDuration.LONG)
      .setToastPosition(ToastPosition.BOTTOM)
      .setTextColor(new Color('white'))
      .setBackgroundColor('#222')
      .show();
  }

  alert(title, message) {
    return alert({
      title: title,
      message: message,
      okButtonText: "OK"
    });
  }

  confirm(title, message){
      let options = {
        title,
        message,
        okButtonText: "Yes",
        cancelButtonText: "No"
    };
    
    return confirm(options);
  }

  stretch(url: string) {
    if (url.includes("/series/") || url.includes("/movie/")) {

      return "aspectFill";
    }
    else {
      return "aspectFit";
    }
  }


  getVolaToken(){

    var api = new API();

    let base64 = btoa(JSON.stringify(api));

    var encodedBase64 = encodeURIComponent(base64);

    return `&token=${encodedBase64}`;
  }

}
