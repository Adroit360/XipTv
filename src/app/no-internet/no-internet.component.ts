import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Subscription } from "rxjs";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "app-sub-type",
    templateUrl: "./no-internet.component.html",
    styleUrls: ["./no-internet.component.scss"]
})

export class NoInternetComponent {


    constructor(private routerExtensions:RouterExtensions,page:Page) {
        page.actionBarHidden = true;
    }

    goHome(){
        this.routerExtensions.navigate(["home"]);
    }

    
}
