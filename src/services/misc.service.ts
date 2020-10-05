import { Toasty, ToastDuration, ToastPosition } from "nativescript-toasty";
import { Color } from "tns-core-modules/color/color";
import { alert, confirm } from "tns-core-modules/ui/dialogs/dialogs";
import { API } from "../helpers/API";
import { JsonPipe } from "@angular/common";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { android } from "tns-core-modules/application";
import { isAndroid, ViewBase } from "tns-core-modules/ui/page";
import { ScrollView } from "tns-core-modules/ui/scroll-view";
require("../helpers/base64");
@Injectable()
export class MiscService {
    baseVolaUrl =  "http://flysohigh.xyz/data_4w/data_3w";
    baseVolaUrlFallback = "https://flysohigh.xyz/data_4w/data_3w";

    liveMatchLinks = {};

    selectedLiveMatch;

    liveMatchesData: {};

    selectedSeries;

    logoutDeviceIntervalActive = false;
    // noInternetSubject:Subject<boolean>;

    currentScrollView:ScrollView;

    constructor(private routerExtensions: RouterExtensions) {
        // this.noInternetSubject = new Subject();
        // this.noInternetSubject.subscribe(response=>{
        //   if(response == false){
        //   }
        // });
    }

    showToast(message) {
        new Toasty({ text: message })
            .setToastDuration(ToastDuration.LONG)
            .setToastPosition(ToastPosition.BOTTOM)
            .setTextColor(new Color("white"))
            .setBackgroundColor("#222")
            .show();
    }

    alert(title, message) {
        return alert({
            title: title,
            message: message,
            okButtonText: "OK",
        });
    }

    confirm(title, message) {
        let options = {
            title,
            message,
            okButtonText: "Yes",
            cancelButtonText: "No",
        };

        return confirm(options);
    }

    stretch(url: string) {
        if (url.includes("/series/") || url.includes("/movie/")) {
            return "aspectFill";
        } else {
            return "aspectFit";
        }
    }

    getVolaToken() {
        var api = new API();

        let base64 = btoa(JSON.stringify(api));

        var encodedBase64 = encodeURIComponent(base64);

        return `&token=${encodedBase64}`;
    }

    ValidateEmail(mail): boolean {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        }
        return false;
    }

    openPlayer(item) {
        try {
            let name: string = item.name;
            let url: string = item.url;
            console.log("ItemUrl", url);
            if (url.includes("/series/")) {
                this.selectedSeries = item;
                this.routerExtensions.navigate(["movie-preview"]);
            } else {
                this.routerExtensions.navigate(["player"], {
                    queryParams: {
                        name,
                        url,
                    },
                });
            }
        } catch (error) {}
    }

    // public dispatchKeyEvent(event: android.view.KeyEvent): boolean {
    //     // you can respond to specific keycodes by fi. registering a listener and invoking it when appropriate
    //     console.log("D-Pad center button pressed? " + (event.getKeyCode() === android.view.KeyEvent.KEYCODE_DPAD_CENTER));
    //     // let's highlight the element that currently has the focus
    //     const tnsButton = <ViewBase>this.getCurrentFocus()["jsview"];
    //     if (tnsButton && tnsButton !== this.highlightedElement) {
    //       tnsButton.addPseudoClass("focused");
    //       if (this.highlightedElement) {
    //         this.highlightedElement.deletePseudoClass("focused");
    //       }
    //       this.highlightedElement = tnsButton;
    //     }
    //     return super.dispatchKeyEvent(event);
    //   }

    elementLoaded(args): void {
        if(isAndroid){
            const view = <ViewBase>args.object;
            // There are 2 ways to make the TV controls highlight the currently focused element:
    
            // 1) use a resource that speficies a 'focused' state (uncomment the line below):
            // view.android.setBackgroundResource(identifier);
    
            // 2) don't use a resource, but set a backreference so 'dispatchKeyEvent' in app.ts can swap CSS classes
            view.android["jsview"] = args.object;
        }

    }
}

// NSImg <-> Image
// failureImageUri="~/img/defaultImage.png" placeholderImageUri="~/img/defaultImage.png" <-> style="background:black;"
