import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { TvModel } from "~/data/models/tvModel";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { TvListService } from "~/services/tvlist.service";
import { android, AndroidApplication, AndroidActivityBundleEventData } from "tns-core-modules/application";
import { filter } from "rxjs/operators";
import { UniversalService } from "~/services/universal.service";
import { TopsModel } from "~/data/models/topsModel";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
    selector: "ns-landing",
    templateUrl: "./landing.component.html",
    styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit, OnDestroy {
    tvLinks: TvModel[];

    topsModel:TopsModel;

    showPlayer = true;
    // http: any;

    constructor(private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private universalService:UniversalService,
        public tvListService: TvListService) {

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

        if(!this.universalService.isMainVideoLoaded){
            this.universalService.isMainVideoLoaded = true;
        }else{
            this.showPlayer=false;
        }

        this.tvListService.getTops()
        .then(response => {
            this.topsModel = response;
        });


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
        if (item){
            return item.logo.includes("http");
        // return false;
        }
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

    checkImage(logourl) : Promise<string>{

        return new Promise((resolve,reject)=>{
            console.log(logourl);
            this.http.get(logourl).subscribe(response=> {
                resolve(logourl);
                console.log("actual");
            },error=>{
                console.log("Alternative");
                resolve("https://www.oreilly.com/library/view/mastering-geospatial-analysis/9781788293334/assets/dcee7274-f35b-44f2-952c-4305f5475864.png");
            });
        });
    }

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



}


