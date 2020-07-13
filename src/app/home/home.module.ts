import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeRoutingModules } from "./home.routing.module";
import { NativeScriptCommonModule} from "nativescript-angular/common";
import { HomeComponent } from "./home.component";
import { LandingComponent } from "./landing/landing.component";
import { PlayerComponent } from "../player/player.component";
import { LandingModule } from "./landing/landing.module";
import { SharedModule } from "../shared/shared.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

@NgModule({
    declarations:[
        HomeComponent
    ],
    imports:[
        HomeRoutingModules,
        NativeScriptCommonModule,
        NativeScriptUISideDrawerModule,
        LandingModule,
        SharedModule
    ],
    schemas:[NO_ERRORS_SCHEMA]
})
export class HomeModule{

}