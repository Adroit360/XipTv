import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { AuthService } from "~/services/auth.service";
import { RouterExtensions } from "nativescript-angular/router";
import { UserForReturnDTO } from "~/data/dtos/userForReturnDTO";
@Component({
    selector:"app-profile",
    templateUrl:"./profile.component.html",
    styleUrls:["./profile.component.scss"]
})

export class ProfileComponent implements OnInit{

    currentUser : UserForReturnDTO;

    constructor(private page:Page,
        private routerExtensions:RouterExtensions,
        private authService:AuthService){
        page.actionBarHidden = false;
    }

    ngOnInit(){
        this.currentUser = this.authService.currentUser;
    }

    logout(){
        this.authService.logout();
        this.routerExtensions.navigate(["login"],{
            clearHistory:true
        });
    }

    viewSubscriptions(){
        this.routerExtensions.navigate(["sub-type","false"]);
    }
}
