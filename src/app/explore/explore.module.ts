import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ExploreComponent } from "./explore.component";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes:Route[] = [
    {path:"",component:ExploreComponent}
]

@NgModule({
    declarations:[
        ExploreComponent,
    ],
    imports:[SharedModule,
        NativeScriptRouterModule.forChild(routes)
    ],
    exports:[
        NativeScriptRouterModule
    ],
    schemas:[
        NO_ERRORS_SCHEMA
    ]
})

export class ExploreModule{

}
