import { Component } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { AuthService } from "~/services/auth.service";
import { RouterExtensions } from "nativescript-angular/router";
@Component({
    selector:"app-profile",
    templateUrl:"./profile.component.html",
    styleUrls:["./profile.component.scss"]
})

export class ProfileComponent{

    constructor(private page:Page,
        private routerExtensions:RouterExtensions,
        private authService:AuthService){
        //page.actionBarHidden  = true;
    }

    logout(){
        this.authService.logout();
        this.routerExtensions.navigate(["login"],{
            clearHistory:true
        });
    }

}
