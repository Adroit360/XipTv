import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { MoviePreview } from "./movie-preview.component";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes:Route[] = [
    {path:"",component:MoviePreview}
]

@NgModule({
    declarations:[
        MoviePreview,
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

export class MoviePreviewModule{

}
