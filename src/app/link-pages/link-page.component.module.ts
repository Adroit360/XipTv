import { NgModel } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { LinkPagesComponent } from "./link-page.component";

const routes :Route[] = [
    {path:"", component:LinkPagesComponent},
]

@NgModule({
        declarations:[
            LinkPagesComponent
        ],
        imports:[
            SharedModule,
            NativeScriptRouterModule.forChild(routes)
        ],
        exports:[
            NativeScriptRouterModule
        ],
        schemas:[
            NO_ERRORS_SCHEMA
        ]
})
export class LinkPageModule{
}
