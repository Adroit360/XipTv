import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { TvModel } from "~/data/models/tvModel";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { TvListService } from "~/services/tvlist.service";
import { android, AndroidApplication, AndroidActivityBundleEventData } from "tns-core-modules/application";
import { filter } from "rxjs/operators";
import { UniversalService } from "~/services/universal.service";
import { TopsModel } from "~/data/models/topsModel";
import * as appStorage from "tns-core-modules/application-settings";
import { Subscription } from "~/data/models/subscriptions";
import { PackageType } from "~/data/models/packagetype";

@Component({
    selector: "ns-landing",
    templateUrl: "./landing.component.html",
    styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit, OnDestroy {
    PackageType = PackageType;

    tvLinks: TvModel[];

    topsModel:TopsModel;

    showPlayer = true;

    currentSubscription: Subscription;

    
    constructor(private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private universalService:UniversalService,
        public tvListService: TvListService) {

            this.tvListService.getTops()
        .then(response => {
            this.topsModel = response;
        });

        this.currentSubscription = this.tvListService.currentSubscription;

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                // if (!event.urlAfterRedirects.includes("landing") && this.videoplayer.nativeElement) {
                //     this.videoplayer.nativeElement.pause();
                // } else {
                    // if (this.videoplayer.nativeElement)
                    //     this.videoplayer.nativeElement.play();
                // }
            });

        // if (android) {

        //     android.on(AndroidApplication.activityPausedEvent, function (args: AndroidActivityBundleEventData) {
        //         this.videoplayer.nativeElement.pause();
        //     });

        //     android.on(AndroidApplication.activityResumedEvent, function (args: AndroidActivityBundleEventData) {
        //         this.videoplayer.nativeElement.play();
        //     });

        //     android.on(AndroidApplication.activityStoppedEvent, function (args: AndroidActivityBundleEventData) {
        //         if (this.videoplayer.nativeElement) {
        //             this.videoplayer.nativeElement.destroy();
        //         }
        //     });

        // }
    }

    ngOnInit() {
        // this.videoplayer.nativeElement.play();
        appStorage.setBoolean("isNew",false);
        if(!this.universalService.isMainVideoLoaded){
            this.universalService.isMainVideoLoaded = true;
        }else{
            this.showPlayer=false;
        }
    }

    openPlayer(name, url) {
        // if (this.videoplayer.nativeElement && this.videoplayer.nativeElement["pause"])
        //     this.videoplayer.nativeElement.pause();
        this.routerExtensions.navigate(['player'], {
            queryParams: {
                name,
                url
            }
        })
    }

    ngOnDestroy() {
        //this.videoplayer.nativeElement.destroy();
    }

    isLogoPresent(item) {
        if (item)
            return item.logo.includes("http");

        return false;
    }

    viewAll(){
        this.routerExtensions.navigate(["home",'search'],{
            clearHistory:true
        });
    }

    playerFinished(){
        this.showPlayer = false;
    }

    playbackReady(){
        this.showPlayer = true;
    }

}
