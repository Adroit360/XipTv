import { Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { isAndroid, Page } from "tns-core-modules/ui/page";
import { TvModel } from "~/data/models/tvModel";
import { TvListService } from "~/services/tvlist.service";
import {ScrollView} from 'tns-core-modules/ui/scroll-view';
import { MiscService } from "~/services/misc.service";

@Component({
    selector: 'ns-movie-preview',
    templateUrl: './movie-preview.component.html',
    styleUrls: ['./movie-preview.component.scss']
})

export class MoviePreview {
    
    currentMovieName: string;
    currrentMovieUrl: string;
    currentMovieLogoUrl: string;

    private seasonNumberString: string;
    private episodeString: string;

    seasonEpisodes: TvModel[];
    seasons: TvModel[];
    isLoading;
    
    @ViewChild("scrollView",{static:true}) scrollView:ElementRef<ScrollView>;

    constructor(private page: Page,
        private misService:MiscService,
        private tvListService: TvListService,
        private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute) {
            
        // if (isAndroid)
        //     page.actionBarHidden = true;

        let series = misService.selectedSeries;
        this.initialize(series.name, series.url, series.logo);
    }


    initialize(name, url, logo) {
        try {
            this.isLoading = true;
            let matches = (/(.*?(S\d+)) (E\d+)/gm).exec(name);

            this.currentMovieName = matches[0];
            this.currrentMovieUrl = url;
            this.currentMovieLogoUrl = logo;


            this.seasonNumberString = matches[1];

            this.getSeasonsAndEpisodes(this.seasonNumberString)
                .then(response => {
                    this.seasonEpisodes = response.episodes;
                    this.seasons = response.seasons;

                    let sView = this.scrollView.nativeElement;
                    this.scrollView.nativeElement.scrollToVerticalOffset(0,true);
                    this.isLoading = false;
                }).catch(error=>{
                    console.log(error);
                });

        } catch {
            this.openPlayer({ name, url });
        }

    }

    getSeasonsAndEpisodes(seasonNumberString): Promise<{ episodes: any[], seasons: any[] }> {
        return new Promise((resolve, reject) => {
            this.tvListService.getAllLinks().then((response) => {
                let movieName = seasonNumberString.substring(0, seasonNumberString.length - 3);
                let episodes = [];
                let seasons = [];
                let currentlyLoopedSeason;
                for (const item of response) {
                    if (item.name.includes(seasonNumberString)) {
                        episodes.push(item);
                    }

                    if (item.name.includes(movieName)) {
                        let itemRegExp = (/((.*?)S\d+)/gm).exec(item.name);

                        if(!itemRegExp)
                            continue;

                        //Check for the only the name of the movie eg: Arrow
                        if (itemRegExp[2] == movieName) {

                            //Get the name of the movie with the season eg : Arrow S01
                            let loopedSeason = itemRegExp[0];
                            if (currentlyLoopedSeason != loopedSeason) {
                                currentlyLoopedSeason = loopedSeason;
                                seasons.push(item);
                            }
                        }
                    }

                }
                resolve({
                    episodes,
                    seasons
                });
            }).catch(error => {
                reject({
                    episodes: [],
                    seasons: []
                })
            })

        });

    }

    playCurrent() {
        this.openPlayer({ name: this.currentMovieName, url: this.currrentMovieUrl });
    }

    openPlayer(item) {
        try {
            let name: string = item.name;
            let url: string = item.url;
            this.routerExtensions.navigate(['player'], {
                queryParams: {
                    name,
                    url
                }
            });
        } catch (error) {

        }

    }

    openSeason(item) {

        this.initialize(item.name, item.url, item.logo);

    }

}
