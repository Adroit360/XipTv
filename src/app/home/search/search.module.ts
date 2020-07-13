import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "../../shared/shared.module";
import { SearchComponent } from "./search.component";
import { SearchRoutingModule } from "./search.routing.module";

@NgModule({
    declarations:[
        SearchComponent
    ],
    imports:[
        NativeScriptCommonModule,
        SearchRoutingModule,
        SharedModule
    ],
    exports:[
        SearchRoutingModule
    ],
    schemas:[
        NO_ERRORS_SCHEMA
    ]
})
export class LandingModule{

}