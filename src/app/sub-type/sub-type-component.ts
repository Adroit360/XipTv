import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "~/services/auth.service";
import { settings } from "~/helpers/settings";
import { Subscription } from "~/data/models/subscriptions";
import { PackageType } from "~/data/models/packagetype";
import { RouterExtensions } from "nativescript-angular/router";
import { TvListService } from "~/services/tvlist.service";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute } from "@angular/router";
import { ɵNgNoValidate } from "@angular/forms";
import { HttpInterceptorService } from "~/interceptors/http.interceptor";
import { MiscService } from "~/services/misc.service";
import { API } from "~/helpers/API";
import * as appStorage from "tns-core-modules/application-settings";

@Component({
    selector: "app-sub-type",
    templateUrl: "./sub-type.component.html",
    styleUrls: ["./sub-type.component.scss"]
})

export class SubTypeComponent implements OnInit {

    packageType = PackageType;

    userSubscriptions: Subscription[];

    selectedPackageType;

    errorOcurred = false;

    shouldRedirect:string;

    constructor(private httpClient: HttpClient,
        private routerExtensions: RouterExtensions,
        private tvListService: TvListService,
        private activatedRoute:ActivatedRoute,
        private page:Page,
        private router:Router,
        public miscService:MiscService,
        private authService: AuthService) {
        this.getUserSubscriptions();
        let canGoBack = false;
        //let canGoBack = this.routerExtensions.canGoBackToPreviousPage();

        this.logoutByOtherDevice();

        this.activatedRoute.paramMap.subscribe(param=>{
            this.shouldRedirect = param.get("redirect");
        });

        if (!canGoBack) {
            page.actionBarHidden = true;
        }


    }

    ngOnInit() {
        if (this.tvListService.currentSubscription)
            this.selectedPackageType = this.tvListService.currentSubscription.package.packageType;
    }


    logoutByOtherDevice(){
        if(!this.miscService.logoutDeviceIntervalActive){
            
            var interval = setInterval(() => {
                if (this.authService.currentUser){
                    this.authService
                    .getRemoteDeviceIdentifier(this.authService.currentUser.id)
                    .subscribe((response) => {
                        if (
                            !this.authService.isDeviceAllowed(
                                response.deviceIdentifier
                            )
                        ) {
                            this.authService.logout();
                            this.miscService.alert(
                                "logged Out",
                                "Logged Out by another device"
                            );
                            this.miscService.logoutDeviceIntervalActive = false;
                            clearInterval(interval);
                            console.log("Interval Cleared");
                        }
                    });
                }
                  
            }, 120000);

            this.miscService.logoutDeviceIntervalActive = true;
        }

    }


    getUserSubscriptions() {
        this.errorOcurred = false;
        if (!this.authService.currentUser)
            return;
        var userId = this.authService.currentUser.id;
        
        var subcriptionString = appStorage.getString('userSubscriptions');
        if(subcriptionString){
            this.userSubscriptions = JSON.parse(subcriptionString);
        }

        this.httpClient.get<Subscription[]>(`${settings.baseUri}/subscription/getsubscription/${userId}`)
            .subscribe(response => {
                this.userSubscriptions = response;
                appStorage.setString('userSubscriptions',JSON.stringify(response));
                this.errorOcurred = false;

                if(this.shouldRedirect == "true" && this.userSubscriptions.length == 1){
                    this.chooseSubscription(this.userSubscriptions[0]);
                }
            }, error => {
                this.errorOcurred = true;
            });
    }

    addSubscription() {
        this.routerExtensions.navigate(["payment-plan"]);
    }

    chooseSubscription(subscription: Subscription) {

        if(subscription.remainingDays > 0){
            this.tvListService.currentSubscription = subscription;
             this.routerExtensions.navigate(["home"]);
        }else{
            this.miscService.alert("Error","Your subscription has expired, please renew it to continue watching");
        }
    }
    
}
