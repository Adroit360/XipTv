import { Component, OnInit, ViewChild, ElementRef, assertPlatform } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { TvModel } from "~/data/models/tvModel";
import { TvListService } from "~/services/tvlist.service";
import { RouterExtensions } from "nativescript-angular/router";
import { MiscService } from "~/services/misc.service";
@Component({
    selector: "ns-landing",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {

    @ViewChild("SearchBar", { static: true }) SearchBar: ElementRef;

    searchString;
    tvLinks: TvModel[];
    filteredTvLinks: TvModel[];
    filterCount = 0;

    showSearchCancel = false;

    constructor(page: Page, private tvListService: TvListService,
        public misc: MiscService,
        private routerExtensions: RouterExtensions) {
        page.actionBarHidden = true;

        
        this.tvListService.allLinksLoaded.subscribe(response => {
            if (!response)
                return
            this.tvLinks = this.tvListService.tvLinks;
            this.filteredTvLinks = this.tvListService.tvLinks;

        });

        // tvListService.getAllLinks()
        //     .then(response => {
        //         this.tvLinks = response;
        //         this.filteredTvLinks = response;
        //     });
    }

    ngOnInit() {

    }

    cancelSearchBar() {
        var searchBar = this.SearchBar.nativeElement;

        if (searchBar.ios) {
            searchBar.ios.endEditing(true);
        } else if (searchBar.android) {
            searchBar.android.clearFocus();
        }

        this.showSearchCancel = false;
    }


    searchStringChanged(event) {
        this.showSearchCancel = true;
        this.searchString = event.value.toLowerCase();
        this.filterTvList(this.searchString);
    }

    filterTvList(searchString) {
        this.filteredTvLinks = null;
        this.filteredTvLinks = this.tvLinks.filter(i => i.name.toLowerCase().includes(searchString));
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
