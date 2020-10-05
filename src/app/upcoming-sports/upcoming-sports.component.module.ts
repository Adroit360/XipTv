import { NgModel } from "@angular/forms";
import { UpcomingSportsComponent } from "./upcoming-sports.component"
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

const routes :Route[] = [
    {path:"", component:UpcomingSportsComponent},

]

@NgModule({
        declarations:[
            UpcomingSportsComponent,

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
export class UpcomingSportsModule{
}
