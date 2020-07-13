import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TvModel } from "~/data/models/tvModel";
import { settings } from "~/helpers/settings";
import { TvListService } from "~/services/tvlist.service";
import { Page } from "tns-core-modules/ui/page";
import { keepAwake, allowSleepAgain } from "nativescript-insomnia";


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
    
    @ViewChild("videoplayer", { static: true }) videoplayer: ElementRef;

    constructor(private activatedRoute: ActivatedRoute
        , private tvListService: TvListService, private page: Page) {
        page.actionBarHidden = false;
        this.activatedRoute.queryParams.subscribe(param => {
            this.videoName = param.name;
            this.videoSrc = param.url;
            // let url = "";
            // if (param.url)
            //     url = param.url.toString().replace(/\//gi, "*");
            //this.videoSrc = `${settings.baseUri}/tvlist/getstream/http:**m3ulink.com:7899*live*emmanuelofori26381*Hkc7jrpO/56067.m3u8`;
            //this.videoSrc = "";
            console.log(this.videoSrc);
        });
    }

    ngOnInit() {
        insomnia.keepAwake().then(function() {
            console.log("Insomnia is active");
        });
    }

    ngOnDestroy() {
        this.videoplayer.nativeElement.destroy();

        insomnia.allowSleepAgain().then(function() {
            console.log("Insomnia is inactive, good night!");
        });
    }

    playbackReady(){
        this.showLoader = false;
    }

    onPlayerError(){
        this.showInfo = true;
        this.showLoader = false;
        this.loaderText = "could not play video";
    }

    onPlayerPaused(){
        console.log("Player Paused");
        
        if(this.showLoader){
            this.showInfo = true;
            this.showLoader = false;
            this.loaderText = "could not play video";
        }
    }
}
