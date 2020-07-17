import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { AuthService } from "~/services/auth.service";

@Component({
    selector:"app-paymentplans",
    templateUrl:"./paymentplans.component.html",
    styleUrls:["./paymentplans.component.scss"]
})
export class PaymentPlansComponent{
    constructor(private routerExtensions:RouterExtensions,
        private authService:AuthService,
        private page:Page) {
        page.actionBarHidden = true;
    }

    try(){
        this.routerExtensions.navigate(['home'],{
            clearHistory:true
        });
    }

    back(){
        this.authService.logout();
        this.routerExtensions.back();
    }
}