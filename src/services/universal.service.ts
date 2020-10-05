import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { ViewContainerRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

export class UniversalService {
    private sideDrawer: RadSideDrawerComponent;
    rootViewContainerRef: ViewContainerRef;
    countryCode;
    isMainVideoLoaded = false;
    constructor(private httpClient: HttpClient) {

    }

    toggleDrawer() {
        if (this.sideDrawer) {
            this.sideDrawer.nativeElement.showDrawer()
        }
    }

    setSideDrawer(sideDrawer: RadSideDrawerComponent) {
        this.sideDrawer = sideDrawer;
    }

    getClientCountry(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.countryCode)
                resolve(this.countryCode)
            return this.httpClient.get<any>("http://ipinfo.io")
                .subscribe(response => {
                    this.countryCode = response.country.toLowerCase();
                    resolve(this.countryCode);
                });
        });

    }
}