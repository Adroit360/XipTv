import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
// import { ItemService, Item } from "./usage.service";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { MiscService } from "~/services/misc.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular";

@Component({
    selector: "ns-upcoming-sports",
    templateUrl: "./upcoming-sports.component.html",
    styleUrls: ["./upcoming-sports.component.scss"],
})
export class UpcomingSportsComponent implements OnInit {
    regex = /<h5 style=("|')margin-bottom:0px;margin-top:2px;("|')>(.*?)</gm;
    regex2 = /((detail)\.(php)\?(id=)(\d+))/gm;
    imgreg = /(class=("|')img-fluid("|') src=("|')assets\/img\/\w+.jpg("|'))/gm;
    time_secondsreg = /contest_id\s=\s("|')(?<id>\d+)("|');[\s\n]*time_seconds\s=\s("|')(?<time>\d+)("|')/gm;
    highlightsLinkRegex = /((oak_secure_play_1)\.(php)\?(id=)(\d+))/gm;
    highLightsreg = /\w+\s\d+\s-\s\d+\s\w+/gm;

    highlightsBaseUri = `https://flysohigh.xyz/data_4w/data_3w/`;
    timers = [];
    Json = JSON;

    SelectedMatch;

    WebSrc;

    BJ: any[];
    Time = {};
    days: number;

    str;

    // @ViewChild("WebViewRef",{static:true}) webViewRef:ElementRef;

    matchesCount: number;
    hightlightsCount: number;


    constructor(private miscService: MiscService,
        private routerExtensions: RouterExtensions,
        private http: HttpClient, private page: Page) {

    }


    runAlgo(): any[] {
        let m, s, image, time, highLights, link;
        let bj = [];

        //console.log("STR", this.str);
        // // Mathces section

        // console.log("M",this.regex.exec(this.str));
        // console.log("S",this.regex2.exec(this.str));
        // console.log("Image",this.imgreg.exec(this.str));
        // console.log("Time",this.time_secondsreg.exec(this.str));

        while (
            (m = this.regex.exec(this.str)) !== null &&
            (s = this.regex2.exec(this.str)) !== null &&
            (image = this.imgreg.exec(this.str)) !== null &&
            (time = this.time_secondsreg.exec(this.str)) !== null
        ) {

            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === this.regex.lastIndex) {
                this.regex.lastIndex++;
            }
            if (
                bj.indexOf({
                    link: s[0],
                    competitionName: m[3],
                    image: image[0],
                    contextId: time.groups['id'],
                    time_seconds: time.groups['time'],
                }) === -1
            ) {
                bj.push({
                    name: 'matches',
                    link: s[0],
                    competitionName: m[3],
                    image: image[0],
                    contextId: time.groups['id'],
                    time_seconds: time.groups['time'],
                });
            }
        }

        while (
            (link = this.highlightsLinkRegex.exec(this.str)) !==
            null &&
            (highLights = this.highLightsreg.exec(this.str)) !== null &&
            (image = this.imgreg.exec(this.str)) !== null
        ) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (link === this.highlightsLinkRegex.lastIndex) {
                this.highlightsLinkRegex.lastIndex++;
            }
            if (
                bj.indexOf({
                    link: link[0],
                    competitionName: highLights[0],
                }) === -1
            ) {
                bj.push({
                    name: "highlights",
                    link: link[0],
                    competitionName: highLights[0],
                    image: image[0],
                });
            }
        }

        this.matchesCount = bj.filter(i => i.name == "matches").length;
        this.hightlightsCount = bj.filter(i => i.name == "highlights").length;
        return bj;
    }


    ngOnInit() {
        let websrc = `https://flysohigh.xyz/data_4w/data_3w/streamsPNA.php?${this.miscService.getVolaToken()}`;

        this.http.get(websrc, { responseType: 'text', observe: 'response' }).subscribe(response => {

            this.manipulateWebsiteResponse(response.body);

        }, error => {
            this.miscService.alert("Try Again","Couldn't load live events, try again later");
            this.routerExtensions.back();
            console.log(error);
        });

        // this.getWebsite(websrc).then(response => {
        //     this.manipulateWebsiteResponse(websrc);
        // }).catch(error => {
        //     console.log(error);
        // });

    }

    manipulateWebsiteResponse(response) {
        this.str = response;

        this.BJ = this.runAlgo();

        for (const item of this.BJ) {
            if (item.name == "matches") {
                let x = this.timer(item.time_seconds, item.contextId, this.Time);
                this.timers.push(x);
            }
        }
    }

    getWebsite(url): Promise<any> {
        //url = `https://flysohigh.xyz/data_4w/data_3w/streamsPNA.php?&token=eyJ0aW1lc2FtcCI6IjIwMjAtMDktMTEgMTE6MDA6MDIiLCJzYWx0IjoiNDgxIiwic2lnbiI6ImIyNjNkZGVlNWIxZTU5ZDJkNGQxOTEzMGMxNGU1Y2I4In0%3D`;
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);

            xhr.send();

            xhr.onload = function () {
                if (xhr.status != 200) { // HTTP error?
                    // handle error
                    let locationHeader = xhr.getResponseHeader('Location');
                    console.log(locationHeader);
                    let headers = xhr
                        .getAllResponseHeaders()
                        .split('\r\n')
                        .reduce((result, current) => {
                            let [name, value] = current.split(': ');
                            result[name] = value;
                            return result;
                        }, {});
                    reject(headers);
                    return;
                }
                resolve(xhr.response)
            };

            // xhr.onprogress = function (event) {
            //     // report progress
            //     alert(`Loaded ${event.loaded} of ${event.total}`);
            // };

            xhr.onerror = function (error) {
                reject(error);
                // handle non-HTTP error (e.g. network down)
            };
        });

    }



    webViewLoaded() {
        let webView: any = {};//this.webViewRef.nativeElement;
        if (webView.ios) {
            var webHeader = webView.ios.stringByEvaluatingJavaScriptFromString("document.head.innerHTML").trim();
            console.log(webHeader);

            var webBody = webView.ios.stringByEvaluatingJavaScriptFromString("document.body.innerHTML").trim();
            console.log(webBody);

        } else if (webView.android) {
            let webTitle = webView.android.getTitle(); //getting the title title
            console.log(webTitle)
        }
    }

    webViewLoading(event) {
        var str = event.url;

        console.log(event);
    }

    timer(upgradeTime, contextId, container) {
        //

        if (!container[contextId]) {
            container[contextId] = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                upgradeTime: upgradeTime,
            };
        }

        let context = container[contextId];


        let x = setInterval(() => {

            if (upgradeTime == 0) {
                clearInterval(x);
            }

            var days = Math.floor(upgradeTime / 24 / 60 / 60);
            var hoursLeft = Math.floor((upgradeTime) - (days * 86400));
            var hours = Math.floor(hoursLeft / 3600);
            var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
            var minutes = Math.floor(minutesLeft / 60);
            var remainingSeconds = upgradeTime % 60;

            context.days = days;
            context.hours = hours;
            context.minutes = minutes;
            context.seconds = remainingSeconds;


            upgradeTime = upgradeTime - 1;

            context.upgradeTime = upgradeTime
            // console.log(context);

        }, 1000);

        return x;
    }



    getTime(contextId) {
        let obj = this.Time[contextId];

        if (!obj)
            return `....`

        if (+obj.upgradeTime > 0)
            return `${obj.days}d : ${obj.hours}h : ${obj.minutes}m : ${obj.seconds}s `
        else if (obj)
            return "LIVE"
    }

    getMatch(contextId): any {
        var item = this.BJ.filter(i => i.contextId == contextId);
        console.log("IIIII", item);
        return item;
    }


    openLink(item) {
        console.log("Tapped","XXXXXXXXX");
        var time = this.Time[item.contextId];
        if (time && time.upgradeTime > 0) {
            this.SelectedMatch = item;
            this.page.actionBarHidden = true;
            return;
        }

        if (item.name == 'matches') {

        } else {
            let url = `${this.highlightsBaseUri}/${item.link}${this.miscService.getVolaToken()}`;
            this.openPlayer(item.competitionName, url);
            //this.miscService.alert("FF","This one dier you go open");
        }
    }

    closeTimeCounter() {
        this.SelectedMatch = null;
        this.page.actionBarHidden = false;
    }

    onDestroy() {
        this.stopTimers();
    }

    stopTimers() {
        for (const x of this.timers) {
            clearInterval(x);
        }
    }

    openPlayer(name, url) {

        this.routerExtensions.navigate(['player'], {
            queryParams: {
                name,
                url
            }
        });

    }
}


class TimingClass {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;

    constructor(init?: Partial<TimingClass>) {
        Object.assign(this, init);
    }

}
