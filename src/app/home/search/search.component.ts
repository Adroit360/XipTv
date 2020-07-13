import { Component,OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { TvModel } from "~/data/models/tvModel";
import { TvListService } from "~/services/tvlist.service";
import { RouterExtensions } from "nativescript-angular/router";
@Component({
    selector: "ns-landing",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
   
    searchString;
    tvLinks:TvModel[];
    filteredTvLinks:TvModel[];
    filterCount = 0;

    constructor(page:Page,private tvListService:TvListService,
        private routerExtensions:RouterExtensions){
        page.actionBarHidden = true;
        
        tvListService.getAllLinks()
        .then(response=>{
            this.tvLinks = response;
            this.filteredTvLinks = response;
        });
    }

    ngOnInit(){

    }

    searchStringChanged(event){
        // this.filterCount ++;
        // if(this.filterCount == 3){
            this.searchString = event.value.toLowerCase();
           // this.filterCount = 0;
            this.filterTvList(this.searchString);
        //}
    }

    filterTvList(searchString){
        this.filteredTvLinks = null;
        this.filteredTvLinks = this.tvLinks.filter(i=>i.name.toLowerCase().includes(searchString)); 
    }

    openPlayer(name, url) {
        this.routerExtensions.navigate(['player'], {
            queryParams: {
                name,
                url
            }
        });
    }

    onSearchBarLoaded(event) {
        if (event.object.android) {
            event.object.dismissSoftInput();
            event.object.android.clearFocus();
            event.object.android.setFocusable(false);
        }
    }
}
