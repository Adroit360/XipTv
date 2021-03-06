import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, AfterViewChecked } from "@angular/core";
import { MiscService } from "~/services/misc.service";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid, isIOS } from "tns-core-modules/ui/page";
import { HttpLoaderService } from "~/services/httploader.service";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "live-sport",
    styleUrls: ["./livesports.component.scss"],
    templateUrl: "./livesports.component.html"
})
export class LiveSportsComponent implements OnInit, AfterViewChecked {
    isAndroid = isAndroid;
    isIos = isIOS;
    websrc = '';
    isLoading = false;
    canGoBack = false;
    isWebViewShown = true;
    @ViewChild("WebViewRef", { static: true }) WebViewRef: ElementRef;
    isPlayingVideo = false;
    constructor(private miscService: MiscService,
        private http: HttpClient,
        private routerExtensions: RouterExtensions) {

    }

    ngOnInit() {
        this.websrc = `http://flysohigh.xyz/data_4w/data_3w/streamsPNA.php?${this.miscService.getVolaToken()}`;
        console.log(this.websrc);
    }

    ngAfterViewChecked() {
        console.log("isWebViewShown", this.isWebViewShown);
        if (this.isPlayingVideo && this.WebViewRef.nativeElement.canGoBack) {
            this.isPlayingVideo = false;
            this.WebViewRef.nativeElement.goBack();
        }
    }

    webViewLoaded(event) {
        this.isLoading = false;
        this.canGoBack = this.WebViewRef.nativeElement.canGoBack;

        if (!this.isPlayingVideo) {
            this.isWebViewShown = true;
        }
    }

    webViewLoading(event) {
        this.isLoading = true;
        var str = event.url;
        if (str.includes("linkonclick")) {
            this.WebViewRef.nativeElement.stopLoading();
            return;
        }

        if (str.includes("m3u8") || str.includes("mp4") || str.includes("mpd") || str.includes("m3u")) {
            this.isPlayingVideo = true;
            this.isWebViewShown = false;
            //this.WebViewRef.nativeElement.stopLoading();
            this.openPlayer("", str);
            return;
        }

        if (!str.includes("token=")) {
            this.websrc = event.url + this.miscService.getVolaToken();
        }


        console.log(event.url);

    }


    openPlayer(name, url) {

        this.routerExtensions.navigate(['player'], {
            queryParams: {
                name,
                url
            }
        });

    }

    back() {
        console.log("canWebViewGoBack", this.WebViewRef.nativeElement.canGoBack);
        if (this.WebViewRef.nativeElement.canGoBack)
            this.WebViewRef.nativeElement.goBack();
        else
            this.routerExtensions.backToPreviousPage();
    }

}