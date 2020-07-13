import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { TvModel } from "~/data/models/tvModel";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { TvListService } from "~/services/tvlist.service";
import { android, AndroidApplication, AndroidActivityBundleEventData } from "tns-core-modules/application";
import { filter } from "rxjs/operators";
import { UniversalService } from "~/services/universal.service";
@Component({
    selector: "ns-landing",
    templateUrl: "./landing.component.html",
    styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit, OnDestroy {
    tvLinks: TvModel[];
    @ViewChild("videoplayer", { static: true }) videoplayer: ElementRef;
    localLinks: TvModel[];
    topLinks: TvModel[];
    topMovies:TvModel[];
    topSeries:TvModel[];

    showPlayer = true;
    
    constructor(private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private universalService:UniversalService,
        public tvListService: TvListService) {

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                if (!event.urlAfterRedirects.includes("landing") && this.videoplayer.nativeElement) {
                    this.videoplayer.nativeElement.pause();
                } else {
                    // if (this.videoplayer.nativeElement)
                    //     this.videoplayer.nativeElement.play();
                }
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
        this.videoplayer.nativeElement.play();

        if(!this.universalService.isMainVideoLoaded){
            this.universalService.isMainVideoLoaded = true;
        }else{
            this.showPlayer=false;
        }

        this.tvListService.getAllLinks()
        .then(response=>{

            this.tvListService.getAllMovies()
            .then((response:TvModel[])=>{
                let date = new Date();
                this.topMovies = response.filter(i=>i.name.includes(date.getFullYear().toString())).slice(0,10);
            });
    
            this.tvListService.getAllSeries()
            .then((response:TvModel[])=>{
                this.topSeries = response.filter(i=>i.name.includes("S01 E01")).slice(0,10).map(i=>{
                    i.name = i.name.replace("S01 E01","");
                    return i;
                });
            });
            
        });


        this.tvListService.getLocalLinks()
        .then(response => {
            this.localLinks = response;
        });

        this.tvListService.getTopLinks()
        .then(response => {
            this.topLinks = response;
        });

       
    }

    openPlayer(name, url) {
        if (this.videoplayer.nativeElement && this.videoplayer.nativeElement["pause"])
            this.videoplayer.nativeElement.pause();
        this.routerExtensions.navigate(['player'], {
            queryParams: {
                name,
                url
            }
        })
    }

    ngOnDestroy() {
        this.videoplayer.nativeElement.destroy();
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
