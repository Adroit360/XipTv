import { Toasty, ToastDuration, ToastPosition } from "nativescript-toasty";
import { Color } from "tns-core-modules/color/color";
import { alert } from "tns-core-modules/ui/dialogs/dialogs";

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
    alert({
      title: title,
      message: message,
      okButtonText: "OK"
    }).then(() => {
    });
  }


  stretch(url: string) {
    if (url.includes("/series/") || url.includes("/movie/")) {
      return "aspectFill";
    }
    else {
      return "aspectFit";
    }
  }
}