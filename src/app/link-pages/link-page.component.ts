import { HttpClient } from "@angular/common/http";
import { Component, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogService, RouterExtensions } from "nativescript-angular";
import { MiscService } from "~/services/misc.service";
import { AllStreamsComponent } from "../all-streams/allstreams.component";
var any = require("promise.any");
@Component({
    selector: "ns-link-pages",
    templateUrl: "./link-page.component.html",
    styleUrls: ["../upcoming-sports/upcoming-sports.component.scss"],
})
export class LinkPagesComponent {
    matchName: string;
    qualities: { hd; sd } = { hd: undefined, sd: undefined };

    isLoading: boolean;
    itemName;
    itemUrl;
    itemContextId;
    itemImage;

    text;

    constructor(
        private activatedRoute: ActivatedRoute,
        public miscService: MiscService,
        private http: HttpClient,
        private modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private routerExtensions: RouterExtensions
    ) {
        this.itemName = miscService.selectedLiveMatch.competitionName;
        this.itemUrl = miscService.selectedLiveMatch.link;
        this.itemContextId = miscService.selectedLiveMatch.contextId;
        this.itemImage = miscService.selectedLiveMatch.image;

        this.extractPlayerLinks();
    }

    extractPlayerLinks() {
        let liveMatchUrl = `${this.miscService.baseVolaUrl}/${
            this.itemUrl
        }${this.miscService.getVolaToken()}`;
        this.isLoading = true;

        if (this.miscService.liveMatchLinks[this.itemContextId]) {
            this.getWorkingLiveMatchesLinks(
                this.miscService.liveMatchLinks[this.itemContextId]
            );
        } else {
            /***** */
            this.http
                .get(liveMatchUrl, {
                    responseType: "text",
                    observe: "response",
                })
                .subscribe(
                    (response) => {
                        /**** */
                        //The html text is in the response.body variable
                        //Get the match links from the html text

                        //***** */
                        let liveMatchLinks = this.getLiveMatchesLinks(
                            response.body
                        );
                        //***** */

                        //Memoise the data
                        this.miscService.liveMatchLinks[
                            this.itemContextId
                        ] = liveMatchLinks;

                        //Return a working link
                        this.getWorkingLiveMatchesLinks(liveMatchLinks);
                    },
                    (error) => {
                        this.miscService.alert(
                            "Try Again",
                            "Couldn't load live events, try again later"
                        );
                        console.log(error);
                    }
                );
        }
    }

    getWorkingLiveMatchesLinks(liveMatchLinks) {
        this.setQualities(this.returnWorkingLiveMatchLinks(liveMatchLinks));
    }

    getLiveMatchesLinks(htmlText) {
        const regex = /(oak_secure_play_\d+\.php\?id=(\d+)).*?>(.*?)</gm;
        let links = [];
        let liveLinks;

        while ((liveLinks = regex.exec(htmlText)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (liveLinks.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            links.push(liveLinks[1] + "*" + liveLinks[3]);
        }

        //console.log(links);
        return links;
    }

    /**
     * Returns a promise wrapping a two element string array with the first being an HD link and the latter , and SD link;
     * @param links The Array of stream links
     */
    returnWorkingLiveMatchLinks(links: string[]): { hdPromises; sdPromises } {
        let HDPromises: Promise<string>[] = [];
        let SDPromises: Promise<string>[] = [];

        for (const link of links) {
            var splittedLinks = link.split("*");
            let url = splittedLinks[0];
            let stream = splittedLinks[1];

            let liveMatchUrl = `${
                this.miscService.baseVolaUrl
            }/${url}${this.miscService.getVolaToken()}`;
            if (stream.includes("SD")) {
                SDPromises.push(
                    new Promise<string>((resolve, reject) => {
                        this.http
                            .get(liveMatchUrl, {
                                responseType: "text",
                                observe: "response",
                            }).subscribe(
                                (response) => {
                                    resolve(liveMatchUrl);
                                },
                                (error) => {
                                    if (error.statusText == "Found")
                                        resolve(liveMatchUrl);
                                    reject(null);
                                }
                            );
                    })
                );
            } else {
                HDPromises.push(
                    new Promise<string>((resolve, reject) => {
                        this.http
                            .get(liveMatchUrl, {
                                responseType: "text",
                                observe: "response",
                            }).subscribe(
                                (response) => {
                                    resolve(liveMatchUrl);
                                },(error) => {
                                    if (error.statusText == "Found")
                                        resolve(liveMatchUrl);
                                    reject(this);
                                }
                            );
                    })
                );
            }
        }

        return { hdPromises: HDPromises, sdPromises: SDPromises };
    }

    openPlayer(name, url) {
        //this.isLoading = false;
        this.routerExtensions.navigate(["player"], {
            queryParams: {
                name,
                url,
            },
        });
    }

    openHd() {
        this.openPlayer(this.itemName, this.qualities.hd.result);
    }

    openSd() {
        this.openPlayer(this.itemName, this.qualities.sd.result);
    }

    settled(allPromises: Promise<any>[]): Promise<{ result; status }[]> {
        return new Promise((resolve, reject) => {
            let results: { result; status }[] = [];

            let settler = {
                _count: 0,
                set count(value) {
                    this._count = value;
                    if (value == 2) resolve(results);
                },
                get count(): number {
                    return this._count;
                },
            };

            for (const promise of allPromises) {
                promise
                    .then((response) => {
                        results.push({
                            status: "fulfilled",
                            result: response,
                        });
                        settler.count = settler.count + 1;
                    })
                    .catch((error) => {
                        results.push({
                            status: "rejected",
                            result: error,
                        });
                        settler.count = settler.count + 1;
                    });
            }
        });
    }

    setQualities(allPromises: { hdPromises; sdPromises }) {
        for (const promise of allPromises.sdPromises) {
            promise
                .then((response) => {
                    this.qualities.sd = {
                        status: "fulfilled",
                        result: response,
                    };
                })
                .catch((error) => {
                    console.log(error);
                    // this.qualities.hd = {
                    //     status: "rejected",
                    //     result: error,
                    // };
                });
        }

        for (const promise of allPromises.hdPromises) {
            promise
                .then((response) => {
                    this.qualities.hd = {
                        status: "fulfilled",
                        result: response,
                    };
                })
                .catch((error) => {
                    // this.qualities.hd = {
                    //     status: "rejected",
                    //     result: error,
                    // };
                });
        }
    }

    showAllLinks() {
        this.modalDialogService
            .showModal(AllStreamsComponent, {
                fullscreen: true,
                viewContainerRef: this.viewContainerRef,
                context: {
                    name: this.itemName,
                    streams: this.miscService.liveMatchLinks[
                        this.itemContextId
                    ],
                },
            })
            .then((response) => {
                if (response) {
                    setTimeout(() => {
                        this.openPlayer(
                            response.name,
                            `${this.miscService.baseVolaUrl}/${
                                response.url
                            }${this.miscService.getVolaToken()}`
                        );
                    }, 0);
                }
            });
    }
}
