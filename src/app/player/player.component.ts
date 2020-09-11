import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TvModel } from "~/data/models/tvModel";
import { settings } from "~/helpers/settings";
import { TvListService } from "~/services/tvlist.service";
import { Page, isAndroid } from "tns-core-modules/ui/page";
import { keepAwake, allowSleepAgain } from "nativescript-insomnia";
import { on } from "tns-core-modules/application";
import * as statusBar from 'nativescript-status-bar'
import { VideoFill } from "nativescript-exoplayer";
import { API } from "~/helpers/API";
import { AuthService } from "~/services/auth.service";
import { MiscService } from "~/services/misc.service";
import { HttpClient } from "@angular/common/http";
import { RouterExtensions } from "nativescript-angular";


var insomnia = require("nativescript-insomnia");
@Component({
    selector: "ns-player",
    styleUrls: ["./player.component.scss"],
    templateUrl: "./player.component.html"
})
export class PlayerComponent implements OnInit, OnDestroy {
    videoSrc = "";
    videoName;
    loaderText = "loading"
    showLoader = true;
    infoText = "could not play video";
    showInfo = false;

    timeout;
    @ViewChild("videoplayer", { static: true }) videoplayer: ElementRef;

    constructor(private activatedRoute: ActivatedRoute,
        private authService:AuthService,
        private miscService:MiscService,
        private http:HttpClient,
        private routerExtensions:RouterExtensions
        , private tvListService: TvListService, private page: Page) {
        page.actionBarHidden = false;
        on("orientationChanged", this.onOrientationChanged);
        this.activatedRoute.queryParams.subscribe(param => {
            let videoUrl = param.url;
            //let videoUrl = "http://m3ulink.com:7899/live/justiceaddico91-restream/Ep4bpAVn/110412.m3u8";
            console.log(videoUrl);

            this.videoName = param.name;
            this.videoSrc = param.url;
            //this.videoSrc = "www.man/mango.mp4";
            //  let url = "";
            //  if (videoUrl)
            //     url = videoUrl.toString().replace(/\//gi, "*");
            //  this.videoSrc = `${settings.baseUri}/tvlist/getstream/${url}`;
            console.log(this.videoSrc);
            this.checkVideoUrl(this.videoSrc);
        });

        var interval = setInterval(()=>{
            this.authService.getRemoteDeviceIdentifier(this.authService.currentUser.id)
            .subscribe(response=>{
                if(!this.authService.isDeviceAllowed(response.deviceIdentifier)){
                    this.authService.logout();
                    this.miscService.alert("logged Out","Logged Out by another device");
                    clearInterval(interval);
                    console.log("Interval Cleared");
                }
            });
        },120000);
        
    }

    ngOnInit() {
        
        insomnia.keepAwake().then(function () {
            console.log("Insomnia is active");
        });

        this.videoplayer.nativeElement.on("onPlayerError",function(){
            console.log("The Error is working yaaah !!!!!!!!!!!!!!!!!!!!");
        });
        
    }

    currentTimeUpdated(){
        console.log("currentTimeUpdated");
    }

    public onOrientationChanged = (evt) => {
        console.log("orientation changed");
        if (evt.newValue == "landscape") {
            this.hideDetails();
            //this.videoplayer.nativeElement.fill = VideoFill.aspectFill;
        }else{
            //this.videoplayer.nativeElement.fill = VideoFill.default;
        }
        //this.videoplayer.nativeElement.fill = VideoFill.aspectFill;
    };

    ngOnDestroy() {
        this.videoplayer.nativeElement.destroy();

        insomnia.allowSleepAgain().then(function () {
            console.log("Insomnia is inactive, good night!");
        });
    }

    playbackReady() {
        this.showLoader = false;
        console.log("playbackReady");
    }

    playbackStartEvent(){
        console.log("playbackStartEvent")
    }

    onPlayerError(event) {
        console.log("PLAYER ERROR OCCURRED");
        this.showInfo = true;
        this.showLoader = false;
        this.loaderText = "could not play video";
    }

    onPlayerPaused() {
        console.log("Player Paused");

        if (this.showLoader) {
            this.showInfo = true;
            this.showLoader = false;
            this.loaderText = "could not play video";
        }
    }

    pageTapped() {
        if(isAndroid){
            if (this.page.actionBarHidden) {
                //Show action bar if its hidden
                this.showDetails();
            }
            else {
                this.hideDetails();
            }
    
            if (this.timeout) {
                clearTimeout(this.timeout)
            }
    
            this.timeout = setTimeout(() => {
                this.hideDetails();
            }, 5000);
        }
        
    }

    showDetails(){
        this.page.actionBarHidden = false;
        statusBar.show();
        // this.videoplayer.nativeElement.scaleX = "1";
        // this.videoplayer.nativeElement.scaleY = "1";
    }

    hideDetails(){
        this.page.actionBarHidden = true;
        statusBar.hide();
        // this.videoplayer.nativeElement.scaleX = "1.3";
        // this.videoplayer.nativeElement.scaleY = "1";
    }

    checkVideoUrl(url){
        this.http.get(url,{responseType:"text",observe:'response'}).subscribe(response=>{
           
        },error => {
            this.miscService.alert("Try Again later","Video not available at the the moment");
            //this.miscService.alert("Error",error);
            this.routerExtensions.back();
        });
    }
}
