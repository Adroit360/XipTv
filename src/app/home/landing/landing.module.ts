import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { LandingRoutingModule } from "./landing.routing.module";
import { LandingComponent } from "./landing.component";
import { SharedModule } from "../../shared/shared.module";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

@NgModule({
    declarations:[
        LandingComponent
    ],
    imports:[
        NativeScriptCommonModule,
        LandingRoutingModule,
        SharedModule,
        NativeScriptUIListViewModule
    ],
    exports:[
        LandingRoutingModule
    ],
    schemas:[
        NO_ERRORS_SCHEMA
    ]
})
export class LandingModule{

}