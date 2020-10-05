import {
    Component,
    ViewChild,
    ElementRef,
    OnInit,
    OnDestroy,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TvModel } from "~/data/models/tvModel";
import { settings } from "~/helpers/settings";
import { TvListService } from "~/services/tvlist.service";
import { Page, isAndroid, isIOS } from "tns-core-modules/ui/page";
import { keepAwake, allowSleepAgain } from "nativescript-insomnia";
import { on } from "tns-core-modules/application";
import * as statusBar from "nativescript-status-bar";
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
    templateUrl: "./player.component.html",
})
export class PlayerComponent implements OnInit, OnDestroy {
    triedTimes =1;

    videoSrc = "";
    videoName;
    loaderText = "loading";
    showLoader = true;
    infoText = "could not play video";
    showInfo = false;

    WebSrc;
    str;
    @ViewChild("WebViewRef", { static: true }) WebViewRef: ElementRef;

    timeout;
    @ViewChild("videoplayer", { static: true }) videoplayer: ElementRef;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private miscService: MiscService,
        private http: HttpClient,
        private routerExtensions: RouterExtensions,
        private tvListService: TvListService,
        private page: Page
    ) {
        page.actionBarHidden = false;
        on("orientationChanged", this.onOrientationChanged);
        this.activatedRoute.queryParams.subscribe((param) => {
            let videoUrl = param.url;
            this.tvListService.isRemoteLinksChanged();
            console.log("playerurl.org", videoUrl);

            this.showLoadingFeedback(videoUrl);

            //global["playerComponent"] = this;
            global['myPlayerErrorHandler'] = this.onPlayerError.bind(this,this);

            if(isIOS){
               // this.checkVideoUrl(videoUrl);
            }

            this.videoName = param.name;
            if(videoUrl.includes(this.miscService.baseVolaUrl)){
                this.WebSrc = videoUrl;
            }else{
                this.videoSrc = videoUrl;
            }
            this.hideDetails();
        });


        this.tvListService.getCredentials();
    }

    showLoadingFeedback(videoUrl: string) {
        let videoType: string = "";
        if (videoUrl.includes("series") || videoUrl.includes("movie")) {
            videoType = "movie";
        } else if (videoUrl.includes("oak_secure_play")) {
            videoType = "game";
        } else {
            videoType = "channel";
        }
        this.infoText = `Take a chill while we load your ${videoType}`;
        
    }

    // getOakRedirectUrl(url):Promise<string>{
    //     //getWebsite(url): Promise<any> {
    //         //url = `https://flysohigh.xyz/data_4w/data_3w/streamsPNA.php?&token=eyJ0aW1lc2FtcCI6IjIwMjAtMDktMTEgMTE6MDA6MDIiLCJzYWx0IjoiNDgxIiwic2lnbiI6ImIyNjNkZGVlNWIxZTU5ZDJkNGQxOTEzMGMxNGU1Y2I4In0%3D`;
    //         return new Promise((resolve, reject) => {

    //             this.http.get(url,{responseType:'text',observe:"response"}).subscribe(response=>{
    //                 console.log(response);
    //                 resolve("google.com");
    //             });
    //            // let xhr = new XMLHttpRequest();

    //             //xhr.open('GET', url);

    //             //xhr.send();

    //             // xhr.onload = function () {
    //             //     if (xhr.status != 200) { // HTTP error?
    //             //         // handle error
    //             //         let locationHeader = xhr.getResponseHeader('Location');
    //             //         console.log(locationHeader);
    //             //         resolve(locationHeader);
    //             //     }
    //             //     resolve(xhr.response)
    //             // };

    //             // xhr.onreadystatechange = function() {
    //             //     if (xhr.readyState === xhr.DONE) {
    //             //         console.log("Mango",xhr.responseURL);
    //             //     }
    //             // };

    //             // xhr.onprogress = function (event) {
    //             //     // report progress
    //             //     alert(`Loaded ${event.loaded} of ${event.total}`);
    //             // };

    //             // xhr.onerror = function (error) {
    //             //     reject(error);
    //             //     // handle non-HTTP error (e.g. network down)
    //             // };
    //         });

    //     //}

    // }

    ngOnInit() {
        insomnia.keepAwake().then(function () {
            console.log("Insomnia is active");
        });
    }

    currentTimeUpdated() {
        console.log("currentTimeUpdated");
    }

    public onOrientationChanged = (evt) => {
        console.log("orientation changed");
        if (evt.newValue == "landscape") {
            this.hideDetails();
            //this.videoplayer.nativeElement.fill = VideoFill.aspectFill;
        } else {
            //this.videoplayer.nativeElement.fill = VideoFill.default;
        }
        //this.videoplayer.nativeElement.fill = VideoFill.aspectFill;
    };

    ngOnDestroy() {
        this.videoplayer.nativeElement.pause();
        this.videoplayer.nativeElement.destroy();

        insomnia.allowSleepAgain().then(function () {
            console.log("Insomnia is inactive, good night!");
        });
    }

    playbackReady() {
        this.showLoader = false;
        this.infoText = null;
        // global['myPlayerErrorHandler'] = function(){

        // };

    }

    playbackStartEvent() {
        console.log("playbackStartEvent");
    }

    onPlayerError(context) {
        if(this.triedTimes == 2){
            context.miscService.alert(
                "Try Again later",
                "Video not available at the the moment"
            );
            context.routerExtensions.back();
            return;
        }
        this.triedTimes +=1 ;
        if(this.WebSrc){
            if(this.WebSrc.includes("http://")){
                this.WebViewRef.nativeElement.src = this.WebSrc.replace("http://","https://")
            }else if(this.WebSrc.includes("https://")){
                this.WebViewRef.nativeElement.src = this.WebSrc.replace("https://","http://")
            }
        }else{
            if(this.videoSrc.includes("http://")){
                this.videoSrc = this.videoSrc.replace("http://","https://")
            }else if(this.videoSrc.includes("https://")){
                this.videoSrc = this.videoSrc.replace("https://","http://")
            }
        }

        
        
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
        // if (isAndroid) {
        if (this.page.actionBarHidden) {
            //Show action bar if its hidden
            this.showDetails();
        } else {
            this.hideDetails();
        }

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.hideDetails();
        }, 5000);
        // }
    }

    showDetails() {
        this.page.actionBarHidden = false;
        statusBar.show();
        // this.videoplayer.nativeElement.scaleX = "1";
        // this.videoplayer.nativeElement.scaleY = "1";
    }

    hideDetails() {
        this.page.actionBarHidden = true;
        statusBar.hide();
        // this.videoplayer.nativeElement.scaleX = "1.3";
        // this.videoplayer.nativeElement.scaleY = "1";
    }

    webViewLoading(event) {
        var str = event.url;

        if (str.includes("linkonclick")) {
            this.WebViewRef.nativeElement.stopLoading();
            return;
        }

        if (str.includes("m3u8") || str.includes("mp4") || str.includes("mpd") || str.includes("m3u")) {
            this.WebViewRef.nativeElement.src = "https:google.com";
            //this.WebViewRef.nativeElement.stopLoading();
            this.videoSrc = str;
            this.videoplayer.nativeElement.play();
            //this.checkVideoUrl(str);
            return;
        }
    }


    checkVideoUrl(url) {
        //url = "https://xiptv-api.azurewebsites.net/api/tvlist/tops";
        this.getWebsite(url)
            .then((response) => {
                console.log("CheckVideo Url working");
            })
            .catch((error) => {
                console.log(error);
                // if(error.status == 200 && error.message.includes("Http failure during parsing for")){

                // }else{
                this.miscService.alert(
                    "Try Again later",
                    "Video not available at the the moment"
                );
                this.routerExtensions.back();
                // }
                //this.miscService.alert("Error",error);
            });
    }


    getWebsite(url): Promise<Boolean> {
        //url = `https://flysohigh.xyz/data_4w/data_3w/streamsPNA.php?&token=eyJ0aW1lc2FtcCI6IjIwMjAtMDktMTEgMTE6MDA6MDIiLCJzYWx0IjoiNDgxIiwic2lnbiI6ImIyNjNkZGVlNWIxZTU5ZDJkNGQxOTEzMGMxNGU1Y2I4In0%3D`;
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            console.log("Checking Url",url);
            xhr.responseType = "text";

            xhr.open("HEAD", url);

            xhr.send();

            xhr.onload = function () {
                if (xhr.status != 200 && this.status != 405) {
                    // HTTP error?
                    // handle error
                    reject(true);
                    return;
                }
                resolve(xhr.response);
            };

            xhr.onreadystatechange = function () {
                if (this.readyState == this.DONE) {
                    if (this.status == 200 || this.status == 405) {
                        resolve(true);
                    }
                    reject(false);
                }
            };

            xhr.onprogress = function (event) {
                // report progress
                console.log(this);
            };

            // xhr.onerror = function (error) {
            //     reject(false);
            //     // handle non-HTTP error (e.g. network down)
            // };
        });
    }

    
}
