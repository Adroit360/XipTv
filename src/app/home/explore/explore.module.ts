import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "../../shared/shared.module";
import { ExploreRoutingModule } from "./explore.routing.module";
import { ExploreComponent } from "./explore.component";

@NgModule({
    declarations:[
        ExploreComponent
    ],
    imports:[
        NativeScriptCommonModule,
        ExploreRoutingModule,
        SharedModule
    ],
    exports:[
        ExploreRoutingModule
    ],
    schemas:[
        NO_ERRORS_SCHEMA
    ]
})
export class ExploreModule{

}