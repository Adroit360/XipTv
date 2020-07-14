import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector:"app-paymentplans",
    templateUrl:"./paymentplans.component.html",
    styleUrls:["./paymentplans.component.scss"]
})
export class PaymentPlansComponent{
    constructor(private routerExtensions:RouterExtensions,private page:Page) {
        page.actionBarHidden = true;
    }

    try(){
        this.routerExtensions.navigate(['home'],{
            clearHistory:true
        });
    }
}