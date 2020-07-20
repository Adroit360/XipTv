import { Component, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/common";
import { TvModel } from "~/data/models/tvModel";
import { TvListService } from "~/services/tvlist.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, isAndroid } from "tns-core-modules/ui/page";


@Component({
    selector:`ns-tvlist`,
    templateUrl:`./tvlist-modal.component.html`,
    styleUrls:['./tvlist-modal.component.scss']
})
export class TvListModalComponent{
    searchString;
    tvLinks:TvModel[];
    filteredTvLinks:TvModel[];
    filterCount = 0;
    category;
    isAndroid = isAndroid;

    showSearchCancel = false;

    @ViewChild("SearchBar", { static: true }) SearchBar: ElementRef;

    constructor(page:Page,private tvListService:TvListService,
        private routerExtensions:RouterExtensions,
        private modalParams:ModalDialogParams){
        page.actionBarHidden = true;
        
        this.category = this.modalParams.context.toLowerCase();

        tvListService.getAllLinks()
        .then(response=>{
            this.tvLinks = response.filter(i=>{
                if(i.category)
                    return i.category.toLowerCase() == this.category
                
                return false;
            });
            this.filteredTvLinks = this.tvLinks;
        });
    }

    ngOnInit(){

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


    searchStringChanged(event){
        this.showSearchCancel = true;
            this.searchString = event.value.toLowerCase();
            this.filterTvList(this.searchString);
        //}
    }

    filterTvList(searchString){
        this.filteredTvLinks = null;
        this.filteredTvLinks = this.tvLinks.filter(i=>i.name.toLowerCase().includes(searchString));
    }

    openPlayer(name, url) {
        this.modalParams.closeCallback({
            name,
            url
        });
    }

    closeModal(){
        this.modalParams.closeCallback();
    }
}