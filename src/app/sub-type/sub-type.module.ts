import { NgModel } from "@angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { SubTypeComponent } from "./sub-type-component";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes :Route[] = [
    {path:"",component:SubTypeComponent}
]

@NgModule({
    declarations:[
        SubTypeComponent
    ],
    imports:[
        SharedModule,
        NativeScriptRouterModule.forChild(routes)
    ],
    exports:[
        NativeScriptRouterModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class SubTypeModule{

}
