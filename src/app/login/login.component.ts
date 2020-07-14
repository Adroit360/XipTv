import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector:"app-login",
    templateUrl:"./login.component.html",
    styleUrls:["../register/register.component.scss"],
})
export class LoginComponent{

    constructor(private routerExtensions:RouterExtensions,private page:Page) {
        page.actionBarHidden = true;
    }
    login(){
        this.routerExtensions.navigate(['payment-plan'],{
            clearHistory:true
        });
    }

    gotoRegister(){
        this.routerExtensions.navigate(['register']);
    }
}
