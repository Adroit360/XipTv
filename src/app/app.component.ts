import { Component, ViewContainerRef } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { Video } from 'nativescript-videoplayer';
import { UniversalService } from "~/services/universal.service";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { RouterExtensions } from "nativescript-angular/router";
import { HttpLoaderService } from "~/services/httploader.service";
import * as appStorage from "tns-core-modules/application-settings";
// import { registerElement } from 'nativescript-angular/element-registry';
import { Gif } from 'nativescript-gif';
import { TvListService } from "~/services/tvlist.service";
import { AuthService } from "~/services/auth.service";

import * as application from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";
import * as frame from "tns-core-modules/ui/frame";
import { isAndroid, ViewBase } from "tns-core-modules/ui/core/view-base";
import { android } from "tns-core-modules/application";
import { MiscService } from "~/services/misc.service";


registerElement('Gif', () => Gif);
registerElement("VideoPlayer", () => Video);
registerElement("exoplayer", () => require("nativescript-exoplayer").Video);
//registerElement('LottieView', () => LottieView);


@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    isNew = "isNew";

    constructor(universalService: UniversalService,
        private routerExtensions: RouterExtensions,
        public loaderService: HttpLoaderService,
        private miscService:MiscService,
        private tvListService: TvListService,
        private authService: AuthService,
        private vcRef: ViewContainerRef, router: Router) {
  
        
        
        universalService.rootViewContainerRef = vcRef;
        router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                console.log(event.urlAfterRedirects);
        });

        

        if (appStorage.getBoolean(this.isNew, true)) {
            // this.routerExtensions.navigate(["upcoming-sports"]);
            // return;

            this.routerExtensions.navigate(["get-started"]);
        } else {
            // this.routerExtensions.navigate(["upcoming-sports"]);
            // return;

            this.authService.getCurrentUser();
            if (this.authService.currentUser) {
                this.routerExtensions.navigate(["sub-type"]);
            } else {
                this.routerExtensions.navigate(["login"]);
            }
        }

    }

    public navigate(link: string): void {
        this.routerExtensions.navigate([link], {
            animated: true,
            transition: { name: 'fade' }
        });
    }

    
}




  



