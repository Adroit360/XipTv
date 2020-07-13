import { NgModule, Component } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Route } from "@angular/router";
import { path } from "tns-core-modules/file-system";
import { LandingComponent } from "./landing.component";

const routes:Route[]=[
    {path:"",component:LandingComponent,pathMatch:"full"}
]
@NgModule({
    imports:[
        NativeScriptRouterModule.forChild(routes)
    ],
    exports:[
        NativeScriptRouterModule
    ]
})
export class LandingRoutingModule{

}