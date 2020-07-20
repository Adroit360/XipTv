import { Component, ViewContainerRef } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { Video } from 'nativescript-videoplayer';
import { UniversalService } from "~/services/universal.service";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { RouterExtensions } from "nativescript-angular/router";
import { HttpLoaderService } from "~/services/httploader.service";
import * as appStorage from "tns-core-modules/application-settings";

registerElement("VideoPlayer", () => Video);
registerElement("exoplayer", () => require("nativescript-exoplayer").Video);

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    isNew = "isNew";

    constructor(universalService: UniversalService,
        private routerExtensions: RouterExtensions,
        public loaderService: HttpLoaderService,
        private vcRef: ViewContainerRef, router: Router) {
        universalService.rootViewContainerRef = vcRef;
        router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                console.log(event.urlAfterRedirects);
            });


        if (appStorage.getBoolean(this.isNew, true)) {
<<<<<<< HEAD
            this.routerExtensions.navigate(["explore"]);
=======
            this.routerExtensions.navigate(["get-started"]);
>>>>>>> 9617ec1f414176489f0dfbf6eafb60b98d6c60f5
            console.log("THis is sooo not loading from backend😂");
        } else{
            this.routerExtensions.navigate(["login"]);
            console.log("This is reading the get started in ap.module.ts☹️ ");
        }
    }
}


