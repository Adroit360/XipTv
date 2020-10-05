import { Component, OnInit } from "@angular/core";
import { TvListService } from "~/services/tvlist.service";
import { RouterExtensions } from "nativescript-angular/router";
import { MiscService } from "~/services/misc.service";
@Component({
    selector: "ns-landing",
    templateUrl: "./explore.component.html",
    styleUrls: ["./explore.component.scss"]
})
export class ExploreComponent implements OnInit {
    imagesLength = 12;
    tvs: any[];

    constructor(private tvListService: TvListService, 
        public miscService:MiscService,
        private routerExtensions: RouterExtensions) { }

    ngOnInit() {

        this.tvListService.allLinksLoaded.subscribe(response => {
            if (!response)
                return;
            console.log(this.tvListService.tvLinks.length);

            this.tvs = [];
            for (let i = 0; i < this.imagesLength; i++) {
                var tvLinks = this.tvListService.tvLinks;
                var randomNumber = Math.floor(Math.random() * tvLinks.length);

                this.tvs.push(tvLinks[randomNumber])
            }
        });

    }

    getSrc(index) {
        let tv = this.tvs[index - 1];
        if (!tv)
            return "";

        // console.log(tv);
        return tv.logo;
    }

    imageTapped(index) {
        var tvModel = this.tvs[index - 1];

        this.openPlayer(tvModel);
    }

    
    openPlayer(item) {
        this.miscService.openPlayer(item);
    }


    viewAll(){
        this.routerExtensions.navigate(["home",'search'],{
            clearHistory:true
        });
    }
}
