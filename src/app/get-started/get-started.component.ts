import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "app-get-started",
    templateUrl: "./get-started.component.html",
    styleUrls: ["./get-started.component.scss"]
})
export class GetStartedComponent {

    constructor(private routerExtensions: RouterExtensions) {

    }

    login() {
        this.routerExtensions.navigate(["login"], {
            clearHistory: true
        });
    }
}