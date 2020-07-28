import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TvModel } from "~/data/models/tvModel";
import { settings } from "~/helpers/settings";
import { TvListService } from "~/services/tvlist.service";
import { Page } from "tns-core-modules/ui/page";
import { keepAwake, allowSleepAgain } from "nativescript-insomnia";
import { on } from "tns-core-modules/application";
import * as statusBar from 'nativescript-status-bar'
import { VideoFill } from "nativescript-exoplayer";


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

    constructor(private activatedRoute: ActivatedRoute
        , private tvListService: TvListService, private page: Page) {
        page.actionBarHidden = false;
        on("orientationChanged", this.onOrientationChanged);
        this.activatedRoute.queryParams.subscribe(param => {
            console.log(param.url);

            this.videoName = param.name;
            this.videoSrc = param.url;
            // let url = "";
            // if (param.url)
            //     url = param.url.toString().replace(/\//gi, "*");
            // this.videoSrc = `${settings.baseUri}/tvlist/getstream/${url}`;
            console.log(this.videoSrc);
        });
    }

    ngOnInit() {
        insomnia.keepAwake().then(function () {
            console.log("Insomnia is active");
        });
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
    }

    onPlayerError() {
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

    showDetails(){
        this.page.actionBarHidden = false;
        statusBar.show();
        this.videoplayer.nativeElement.scaleX = "1";
        this.videoplayer.nativeElement.scaleY = "1";
    }

    hideDetails(){
        this.page.actionBarHidden = true;
        statusBar.hide();
        this.videoplayer.nativeElement.scaleX = "1.3";
        this.videoplayer.nativeElement.scaleY = "1";
    }

}
