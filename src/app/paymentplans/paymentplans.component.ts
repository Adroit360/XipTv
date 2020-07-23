import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { AuthService } from "~/services/auth.service";
import { ModalDialogService } from "nativescript-angular/common";
import { Package } from "~/data/models/package";
import { PackageType } from "~/data/models/packagetype";
import { PaymentModalComponent } from "./payment-modal/payment-modal.component";
import { UniversalService } from "~/services/universal.service";
import { SubscriptionService } from "~/services/subscription.service";
import { MiscService } from "~/services/misc.service";
import { TvListService } from "~/services/tvlist.service";

@Component({
    selector:"app-paymentplans",
    templateUrl:"./paymentplans.component.html",
    styleUrls:["./paymentplans.component.scss"]
})
export class PaymentPlansComponent{
    PackageType = PackageType;
    defaultPackages : Package[];

    isLoading = false;

    canGoBack;

    constructor(private routerExtensions:RouterExtensions,
        private authService:AuthService,
        private modalDialogService:ModalDialogService,
        private universalService:UniversalService,
        private miscService:MiscService,
        private subscriptionService:SubscriptionService,
        private tvListService:TvListService,
        private page:Page) {
        page.actionBarHidden = true;

        subscriptionService.getDefaultPackages().then(response=>{
            this.defaultPackages = response;
        });

        this.canGoBack = this.routerExtensions.canGoBackToPreviousPage();
    }

    try(){
        this.routerExtensions.navigate(['home'],{
            clearHistory:true
        });
    }


    subscribe(packageType){
        this.isLoading = true;
        this.modalDialogService.showModal(PaymentModalComponent,{
            fullscreen:true,
            context:packageType,
            viewContainerRef:this.universalService.rootViewContainerRef
        }).then(response=>{
            if(response && response.paid){
                setTimeout(() => {
                    let userId = this.authService.currentUser.id;
                    let packageId = this.defaultPackages.filter(i=>i.packageType == packageType)[0].packageId;
                    this.subscriptionService.addSubscripton(userId,packageId)
                    .subscribe(response=>{
                        this.isLoading = false;
                        this.tvListService.currentSubscription = response;
                        this.routerExtensions.navigate(["sub-type"],{
                            clearHistory:true
                        });
                        this.miscService.alert("Info",`You have ${response.remainingDays} days remaining for this subscription`)
                    },error=>{
                        this.isLoading = false;
                        this.miscService.alert("Error",error);
                    });
                    
                }, 0);
            }else{
                this.isLoading = false;
            }
        });
    }

    back(){
        this.authService.logout();
        this.routerExtensions.back();
    }

}