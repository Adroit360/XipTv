import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Page, Observable } from "tns-core-modules/ui/page";
import { TvModel } from "~/data/models/tvModel";
import { TvListService } from "~/services/tvlist.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { TvListModalComponent } from "./tvlist-modal/tvlist-modal.component";
import { UniversalService } from "~/services/universal.service";
import { MiscService } from "~/services/misc.service";

@Component({
    selector: "ns-landing",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
    objectKeys = Object.keys;
    searchString;
    @ViewChild("SearchBar", { static: true }) SearchBar: ElementRef;
    showSearchCancel = false;
    tvLinks: TvModel[];

    tvGroups: string[];
    filteredTvGroups: string[];
    filterCount = 0;

    bgColors: string[] = [];

    constructor(private page: Page, private tvListService: TvListService,
        private routerExtensions: RouterExtensions,
        public misService:MiscService,
        private universalServcie: UniversalService,
        private modalDialogService: ModalDialogService) {
        

        this.tvListService.allLinksLoaded.subscribe(response => {
            if (!response)
                return

            this.tvLinks = this.tvListService.tvLinks;
            this.createGroups(this.tvLinks);
           
        });

        
        // tvListService.getAllLinks()
        // .then(response => {
        //     this.tvLinks = response;
        //     this.createGroups(response);
        // });
    }

    ngOnInit() {

    }

    searchStringChanged(event) {
        this.showSearchCancel = true;
        this.searchString = event.value.toLowerCase();
        this.filterTvGroup(this.searchString);
        //}
    }

    filterTvGroup(searchString) {
        //this.filteredTvGroups = null;
        setTimeout(() => {
            this.filteredTvGroups = this.tvGroups.filter(i => i.toLowerCase().includes(searchString));
        }, 0);
    }

    showDialog(category) {
        this.modalDialogService.showModal(TvListModalComponent, {
            fullscreen: true,
            viewContainerRef: this.universalServcie.rootViewContainerRef,
            context: category
        }).then((response: TvModel) => {
            this.page.actionBarHidden = false;
            if (response)
                setTimeout(() => {
                    this.openPlayer(response);
                }, 0);
        });
    }

    openPlayer(item) {
        this.misService.openPlayer(item);
    }


    createGroups(tvLinks: TvModel[]) {
        this.tvGroups = [];
        for (const link of tvLinks) {
            if (link.category && !this.tvGroups.includes(link.category)) {
                this.tvGroups.push(link.category)
                this.bgColors.push(this.getColor());
            }
        }
        this.filteredTvGroups = this.tvGroups;
    }

    getColor(): string {
        let darkColors = ["green", "orange", "violet", "orangered"];
        return darkColors[Math.floor(Math.random() * darkColors.length)];
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

}
