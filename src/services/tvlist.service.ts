import { Injectable } from "@angular/core";
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import { TvModel } from "~/data/models/tvModel";
import { settings } from "~/helpers/settings";
import { HttpClient } from "@angular/common/http";
import { timestamp, subscribeOn } from "rxjs/operators";
import { UniversalService } from "./universal.service";
import { Observable, Subject } from "rxjs";
import { TopsModel } from "~/data/models/topsModel";
import { Subscription } from "~/data/models/subscriptions";
const currentAppFolder = knownFolders.currentApp();

@Injectable()
export class TvListService {

    currentSubscription:Subscription;

    oldSubscription:Subscription;

    tvListFile: File;
    tvLinks: TvModel[];
    allMovies: TvModel[];
    allSeries: TvModel[];

    topsModel:TopsModel;

    // localTvLinks: TvModel[];
    // topTvLinks: TvModel[];
    // topMovies: TvModel[];
    // topSeries: TvModel[];

    currentSource = "server";

    constructor(private httpClient: HttpClient, private universalService: UniversalService) {
        //this.tvListFile = currentAppFolder.parent.getFolder('data').getFile("tvlist.txt");
    }

    generateLinks(rawLinksText: string): TvModel[] {
        let individualText = rawLinksText.split('#');
        let tvModels: TvModel[] = []
        for (let text of individualText) {
            if (text.includes('http')) {
                let tvModel: TvModel = new TvModel();
                var name = /tvg-name=\"(.*?)\"/g.exec(text);
                if (name)
                    tvModel.name = name[1];
                var category = /group-title=\"(.*?)"/g.exec(text);
                if (category)
                    tvModel.category = category[1];
                var logo = /tvg-logo=\"(.*?)"/g.exec(text);
                if (logo)
                    tvModel.logo = logo[1];

                let indexOfLastHttp = text.lastIndexOf("http");
                var url = text.substring(indexOfLastHttp, text.length).trim();
                tvModel.url = url;
                tvModels.push(tvModel);
            }
        }
        return tvModels;
    }

    async getAllLinks(): Promise<TvModel[]> {
        return new Promise((resolve, reject) => {

            let uri;
            let serverUri;
            let githubUri;

            if (this.currentSource.includes('server')) {
                uri = `${settings.baseUri}/tvlist/all/${this.currentSubscription.package.packageType}`;
                serverUri = uri;
            }
            else if (this.currentSource.includes('github')) {
                uri = `${settings.githubUrl}/channels.json`;
                githubUri = uri;
            }

            if (this.tvLinks && this.currentSubscription == this.oldSubscription)
                resolve(this.tvLinks);
            else {
                if (this.currentSource.includes("github-server")) {
                    this.httpClient.get<TvModel[]>(githubUri)
                        .subscribe(response => {
                            this.tvLinks = [];
                            this.tvLinks.push(...response);

                            this.httpClient.get<TvModel[]>(serverUri)
                                .subscribe(response => {
                                    this.tvLinks.push(...response);
                                    resolve(this.tvLinks);
                                });
                        });
                } else {
                    this.httpClient.get<TvModel[]>(uri)
                        .subscribe(response => {
                            this.tvLinks = response;
                            resolve(response);
                            this.oldSubscription = this.currentSubscription;
                        });
                }
            }
            ///this.tvLinks = [];
        });
    }

    async getAllMovies(): Promise<TvModel[]> {
        return new Promise((resolve, reject) => {

            // let uri;
            // if (this.currentSource.includes('server')) {
            //     uri = `${settings.baseUri}/tvlist/allmovies`;
            // }

            if (this.allMovies)
                resolve(this.allMovies);
            else {
                resolve(this.tvLinks.filter(i=>i.url.includes("/movie")));
            }
        });
    }

    async getAllSeries(): Promise<TvModel[]> {
        return new Promise((resolve, reject) => {
            // let uri;
            // if (this.currentSource.includes('server')) {
            //     uri = `${settings.baseUri}/tvlist/allseries`;
            // }

            if (this.allSeries)
                resolve(this.allSeries);
            else {
                resolve(this.tvLinks.filter(i=>i.url.includes("/series")));
            }
        });
    }

    async getTops(): Promise<TopsModel> {
        return new Promise((resolve, reject) => {
            if (this.topsModel && this.oldSubscription == this.currentSubscription)
                resolve(this.topsModel);

            if (this.currentSource == 'server') {
                this.httpClient.get<TopsModel>(`${settings.baseUri}/tvlist/tops/${this.currentSubscription.package.packageType}`)
                    .subscribe(response => {
                        this.topsModel = response;
                        resolve(response);
                        this.oldSubscription = this.currentSubscription;
                    });
            } 
        });
    }


    // async getTopLinks(): Promise<TvModel[]> {
    //     return new Promise((resolve, reject) => {
    //         if (this.topTvLinks)
    //             resolve(this.topTvLinks);

    //         if (this.currentSource == 'server') {
    //             this.httpClient.get<TvModel[]>(`${settings.baseUri}/tvlist/top`)
    //                 .subscribe(response => {
    //                     this.topTvLinks = response;
    //                     resolve(response);
    //                 });
    //         } else if (this.currentSource == 'github') {
    //             if (!this.tvLinks) {
    //                 this.getAllLinks()
    //                     .then(response => {
    //                         this.getTopGithubLinks(response)
    //                             .then(links => {
    //                                 this.topTvLinks = links;
    //                                 resolve(links);
    //                             });
    //                     });
    //             } else {
    //                 this.getTopGithubLinks(this.tvLinks)
    //                     .then(links => {
    //                         this.topTvLinks = links;
    //                         resolve(links);
    //                     });
    //             }

    //         }
    //     });
    // }

    // async getLocalLinks(): Promise<TvModel[]> {
    //     return new Promise((resolve, reject) => {
    //         if (this.localTvLinks)
    //             resolve(this.localTvLinks);

    //         if (this.currentSource == 'server') {
    //             this.httpClient.get<TvModel[]>(`${settings.baseUri}/tvlist/local`)
    //                 .subscribe(response => {
    //                     this.localTvLinks = response;
    //                     resolve(response);
    //                 });
    //         } else if (this.currentSource == 'github') {
    //             if (!this.tvLinks) {
    //                 this.getAllLinks()
    //                     .then(response => {
    //                         this.getLocalGithubLinks(response)
    //                             .then(links => {
    //                                 this.localTvLinks = links;
    //                                 resolve(links);
    //                             });
    //                     });
    //             } else {
    //                 this.getLocalGithubLinks(this.tvLinks)
    //                     .then(links => {
    //                         this.localTvLinks = links;
    //                         resolve(links);
    //                     });
    //             }

    //         }
    //     });
    // }



    async getLocalGithubLinks(tvModels: TvModel[]): Promise<TvModel[]> {
        return new Promise((resolve, reject) => {
            this.universalService.getClientCountry()
                .then(response => {
                    resolve(tvModels.filter(i => i.country.code == response));
                });
        });
    }

    async getTopGithubLinks(tvModels: TvModel[]): Promise<TvModel[]> {
        return new Promise((resolve, reject) => {
            resolve(tvModels.filter(i => i.country.code == 'us'));
        });
    }
}