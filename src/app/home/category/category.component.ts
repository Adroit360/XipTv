import { Component, OnInit } from "@angular/core";
import { Page, Observable } from "tns-core-modules/ui/page";
import { TvModel } from "~/data/models/tvModel";
import { TvListService } from "~/services/tvlist.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { TvListModalComponent } from "./tvlist-modal/tvlist-modal.component";
import { UniversalService } from "~/services/universal.service";

@Component({
    selector: "ns-landing",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
    objectKeys = Object.keys;
    searchString;
    tvLinks: TvModel[];

    tvGroups: string[];
    filteredTvGroups: string[];
    filterCount = 0;

    bgColors: string[] = [];

    constructor(page: Page, private tvListService: TvListService,
        private routerExtensions: RouterExtensions,
        private universalServcie: UniversalService,
        private modalDialogService: ModalDialogService) {
        page.actionBarHidden = true;

        tvListService.getAllLinks()
            .then(response => {
                this.tvLinks = response;
                this.createGroups(response);
            });
    }

    ngOnInit() {

    }

    searchStringChanged(event) {
        this.searchString = event.value.toLowerCase();
        this.filterTvGroup(this.searchString);
        //}
    }

    filterTvGroup(searchString) {
        this.filteredTvGroups = null;
        setTimeout(() => {
            this.filteredTvGroups = this.tvGroups.filter(i => i.toLowerCase().includes(searchString));
        }, 0);
    }

    showDialog(category) {
        this.modalDialogService.showModal(TvListModalComponent, {
            fullscreen: true,
            viewContainerRef: this.universalServcie.rootViewContainerRef,
            context: category
        }).then((response: { name, url }) => {
            if (response)
                setTimeout(()=>{
                    this.openPlayer(response.name, response.url);
                },0);
        });
    }

    openPlayer(name, url) {
        this.routerExtensions.navigate(['player'], {
            queryParams: {
                name,
                url
            }
        });
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

}
