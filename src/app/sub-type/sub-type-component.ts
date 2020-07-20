import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "~/services/auth.service";
import { settings } from "~/helpers/settings";
import { Subscription } from "~/data/models/subscriptions";
import { PackageType } from "~/data/models/packagetype";
import { RouterExtensions } from "nativescript-angular/router";
import { TvListService } from "~/services/tvlist.service";
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";
import { ɵNgNoValidate } from "@angular/forms";
import { HttpInterceptorService } from "~/interceptors/http.interceptor";

@Component({
    selector: "app-sub-type",
    templateUrl: "./sub-type.component.html",
    styleUrls: ["./sub-type.component.scss"]
})

export class SubTypeComponent implements OnInit {

    packageType = PackageType;

    userSubscriptions: Subscription[];

    selectedPackageType;

    constructor(private httpClient: HttpClient,
        private routerExtensions: RouterExtensions,
        private tvListService: TvListService,
        private page: Page,
        private authService: AuthService) {
        this.getUserSubscriptions();
        let canGoBack = this.routerExtensions.canGoBackToPreviousPage();

        if (!canGoBack) {
            page.actionBarHidden = true;
        }


    }

    ngOnInit() {
        if (this.tvListService.currentSubscription)
            this.selectedPackageType = this.tvListService.currentSubscription.package.packageType;
    }

    getUserSubscriptions() {
        var userId = this.authService.currentUser.id;
        this.httpClient.get<Subscription[]>(`${settings.baseUri}/subscription/getsubscription/${userId}`)
            .subscribe(response => {
                this.userSubscriptions = response;
            });
    }

    addSubscription() {
        this.routerExtensions.navigate(["payment-plan"]);
    }

    chooseSubscription(subscription: Subscription) {

        this.tvListService.currentSubscription = subscription;


        this.routerExtensions.navigate(["home"]);
    }
}
