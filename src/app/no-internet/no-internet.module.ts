import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NoInternetComponent } from "./no-internet.component";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes :Route[] = [
    {path:"",component:NoInternetComponent}
]

@NgModule({
    declarations:[
        NoInternetComponent
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
export class NoInternetModule{

}
