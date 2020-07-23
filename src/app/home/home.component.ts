import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
// import * as tvlist from "../../data/tvlist.json";
import { TvModel } from "~/data/models/tvModel";
import { settings } from "~/helpers/settings";
import { TvListService } from "~/services/tvlist.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { UniversalService } from "~/services/universal.service";
import { isAndroid } from "tns-core-modules/platform";
import * as connectivity from "tns-core-modules/connectivity";
import { Page } from "tns-core-modules/ui/page";
import { Subscription } from "~/data/models/subscriptions";
import { PackageType } from "~/data/models/packagetype";

@Component({
    selector: "ns-home",
    styleUrls: ["./home.component.scss"],
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    packageType = PackageType;
    
    sideDrawerTransition: DrawerTransitionBase;
    private _activatedUrl: string;

    isLoading = true;
    hasError = false;
    canGoBack = false;
    canGoForward = false;
    route = 'landing';
    isAndroid = isAndroid;

    currentSubscription:Subscription;

    @ViewChild("sideDrawer", { static: true }) sideDrawer: RadSideDrawerComponent;
    //firstEightLinks:TvModel[];
    constructor(private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private universalService: UniversalService,
        private router: Router,
        private page: Page,
        private tvListService: TvListService) {
        page.actionBarHidden = true;
        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this._activatedUrl = event.urlAfterRedirects;
            });
        //this.firstEightLinks = this.tvLinks.slice(0,8);
    }

    ngOnInit() {
        this.currentSubscription = this.tvListService.currentSubscription;
        this.sideDrawerTransition = new SlideInOnTopTransition();
        this.universalService.setSideDrawer(this.sideDrawer);

        this.tvListService.getAllLinks()
        .then(response=>{
        });
    }

    isComponentSelected(url: string): boolean {
        if (this._activatedUrl)
            return this._activatedUrl.includes(url);

        return false;
    }

    onNavItemTap(navItemRoute: string): void {
        this.router.navigate([navItemRoute], {
            relativeTo: this.activatedRoute
        });
        this.sideDrawer.nativeElement.closeDrawer();
    }

    logout() {

    }

    navigate(route) {
        this.isLoading = true;
        this.route = route;
        this.routerExtensions.navigate(["home", route], {
            clearHistory: true
        });
    }

    drawerButtonTapped() {
        this.universalService.toggleDrawer()
    }

    reload() {

    }

    public checkConnection(): boolean {
        switch (connectivity.getConnectionType()) {
            case connectivity.connectionType.none:
                return false;
                break;
            case connectivity.connectionType.wifi:
                return true;
                break;
            case connectivity.connectionType.mobile:
                return true;
                break;
            default:
                return false;
                break;
        }
    }

    gotoProfile(){
        this.routerExtensions.navigate(["profile"]);
    }

    switchSubscription(){
        this.routerExtensions.navigate(["sub-type"])
    }
    
}
