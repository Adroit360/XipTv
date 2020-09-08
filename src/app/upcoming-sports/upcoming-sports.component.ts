import { Component, OnInit } from "@angular/core";
// import { ItemService, Item } from "./usage.service";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { MiscService } from "~/services/misc.service";
import { HttpClient, HttpResponse } from "@angular/common/http";

@Component({
    selector: "ns-upcoming-sports",
    templateUrl: "./upcoming-sports.component.html",
    styleUrls: ["./upcoming-sports.component.scss"],
})
export class UpcomingSportsComponent implements OnInit {
    regex = /<h5 style=("|')margin-bottom:0px;margin-top:2px;("|')>(.*?)</gm;
    regex2 = /((detail)\.(php)\?(id=)(\d+))/gm;
    imgreg = /(class=("|')img-fluid("|') src=("|')assets\/img\/\w+.jpg("|'))/gm;
    timeIdreg = /contest_id\s=\s("|')(?<id>\d+)("|');[\s\n]*time_seconds\s=\s("|')(?<time>\d+)("|')/gm;
    highlightsLinkRegex = /((oak_secure_play_1)\.(php)\?(id=)(\d+))/gm;
    highLightsreg = /\w+\s\d+\s-\s\d+\s\w+/gm;

    BJ: any[];
    LiveHomeHttpResponse;
    str;


    constructor(private miscService: MiscService, private http: HttpClient) {

    }


    runAlgo(): any[] {
        let m, s, image, time, highLights, highLightsLink;
        let bj = [];

        console.log("STR", this.str);
        // Mathces section


        while (
            (m = this.regex.exec(this.str)) !== null &&
            (s = this.regex2.exec(this.str)) !== null &&
            (image = this.imgreg.exec(this.str)) !== null &&
            (time = this.timeIdreg.exec(this.str)) !== null
        ) {

            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === this.regex.lastIndex) {
                this.regex.lastIndex++;
            }
            if (
                bj.indexOf({
                    link: s[0],
                    matches: m[3],
                    images: image[0],
                    timeId: time[2],
                }) === -1
            ) {
                bj.push({
                    name: 'matches',
                    link: s[0],
                    matches: m[3],
                    images: image[0],
                    contextId: time[1],
                    timeId: time[2],
                });
            }
        }

        while (
            (highLightsLink = this.highlightsLinkRegex.exec(this.str)) !==
            null &&
            (highLights = this.highLightsreg.exec(this.str)) !== null &&
            (image = this.imgreg.exec(this.str)) !== null
        ) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (highLightsLink === this.highlightsLinkRegex.lastIndex) {
                this.highlightsLinkRegex.lastIndex++;
            }
            if (
                bj.indexOf({
                    highLightsLink: highLightsLink[0],
                    higlights: highLights[0],
                }) === -1
            ) {
                bj.push({
                    name: "highlights",
                    highLightsLink: highLightsLink[0],
                    highlights: highLights[0],
                    images: image[0],
                });
            }
        }

        return bj;
    }


    ngOnInit() {
        let websrc = `http://flysohigh.xyz/data_4w/data_3w/streamsPNA.php?${this.miscService.getVolaToken()}`;

        //console.log(websrc);

        this.http.get(websrc, { responseType: "text", observe: 'response' }).subscribe(response => {
            //LiveHomeHttpResponse
            this.str = response.body;
            this.BJ = this.runAlgo();
        });

    }


    openLink(item){

    }

}
