import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { GetStartedComponent } from "./get-started.component";

const routes:Route[] = [
    {path:"",component:GetStartedComponent,pathMatch:"full"}
]

@NgModule({
    declarations:[
        GetStartedComponent,
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
export class GetStartedModule{

}