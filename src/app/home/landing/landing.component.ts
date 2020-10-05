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
import { toPublicName } from "@angular/compiler/src/i18n/serializers/xmb";
import { MiscService } from "~/services/misc.service";
import { isAndroid } from "tns-core-modules/ui/page";
import * as application from "tns-core-modules/application";

@Component({
    selector: "ns-landing",
    templateUrl: "./landing.component.html",
    styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit, OnDestroy {
    PackageType = PackageType;

    tvLinks: TvModel[];

    topsModel: TopsModel;

    showPlayer = true;

    currentSubscription: Subscription;

    errorOccured: boolean = false;

    constructor(private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public miscService:MiscService,
        private universalService: UniversalService,
        public tvListService: TvListService) {





    }

    ngOnInit() {
        // this.tvListService.getTops()
        //     .then(response => {
        //         this.topsModel = response;
        //     }).catch(error => {
        //         this.errorOccured = true;
        //     });

        if (isAndroid) {

            application.on('KEYCODE_VOLUME_UP', ()=>this.miscService.alert("","KEYCODE_VOLUME_UP"));
            application.on('KEYCODE_VOLUME_DOWN', ()=>this.miscService.alert("","KEYCODE_VOLUME_DOWN"));
            application.on('KEYCODE_DPAD_DOWN', ()=>this.miscService.alert("","KEYCODE_DPAD_DOWN"));
            application.on('dispatchKeyEvent', ()=>this.miscService.alert("","dispatchKeyEvent"));
    
          }

        this.tvListService.topLinksLoaded.subscribe(response => {
            if (response) {
                console.log("TopLinksLoaded");
                this.topsModel = this.tvListService.topsModel;
                //console.log(this.topsModel);

            }
        });

        this.tvListService.getCredentials();

        this.currentSubscription = this.tvListService.currentSubscription;

        // this.videoplayer.nativeElement.play();
        appStorage.setBoolean("isNew", false);
        if (!this.universalService.isMainVideoLoaded) {
            this.universalService.isMainVideoLoaded = true;
        } else {
            this.showPlayer = false;
        }
    }

    openPlayer(item) {
        this.miscService.openPlayer(item);
    }

    ngOnDestroy() {
        //this.videoplayer.nativeElement.destroy();
    }
k
    isLogoPresent(item) {
        if (item) {
            return item.logo.includes("http");
            // return false;
        }
    }

    viewAll() {
        this.routerExtensions.navigate(["home", 'search'], {
            clearHistory: true
        });
    }

    playerFinished() {
        this.showPlayer = false;
    }

    playbackReady() {
        this.showPlayer = true;
    }

    checkImage(logourl) {

    }

    reload() {
        this.errorOccured = false;
        this.ngOnInit();
    }

    

    //checkImage(logourl) : Promise<string>{

    // return new Promise((resolve,reject)=>{
    //     console.log(logourl);
    //     this.http.get(logourl).subscribe(response=> {
    //         resolve(logourl);
    //         console.log("actual");
    //     },error=>{
    //         console.log("Alternative");
    //         resolve("https://www.oreilly.com/library/view/mastering-geospatial-analysis/9781788293334/assets/dcee7274-f35b-44f2-952c-4305f5475864.png");
    //     });
    // });
    // }

    //     const observable = new Observable(subscriber => {
    //       subscriber.next(logourl);
    //     });

    //     console.log('just before subscribe');
    //     observable.subscribe({
    //       next(x) { console.log('got value ' + x); },
    //       error(err) { console.error('something wrong occurred: ' + err); },
    //       complete() { console.log('done'); }
    //     });
    //     console.log('just after subscribe');
    // }

    // ImageState:;

    // getImageStatus(logoUrl){
    //     this.ImageState = this.http.get(logoUrl)
    // }


    onItemLoading(event){
        let obj = {
            object:event.view.parent
        }
        obj.object.cssClasses.add("focusable");
        obj.object.cssClasses.add("b");

        this.miscService.elementLoaded(obj);

        console.log(event.view.className);


    }

}


