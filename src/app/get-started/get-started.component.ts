import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "app-get-started",
    templateUrl: "./get-started.component.html",
    styleUrls: ["./get-started.component.scss"]
})
export class GetStartedComponent {

    constructor(private routerExtensions: RouterExtensions,
        private page:Page) {
            page.actionBarHidden = true;
    }

    login() {
        this.routerExtensions.navigate(["login"], {
            clearHistory: true
        });
    }
}