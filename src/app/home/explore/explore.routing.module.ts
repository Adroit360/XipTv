import { NgModule, Component } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Route } from "@angular/router";
import { path } from "tns-core-modules/file-system";
import { ExploreComponent } from "./explore.component";

const routes:Route[]=[
    {path:"",component:ExploreComponent,pathMatch:'full'}
]
@NgModule({
    imports:[
        NativeScriptRouterModule.forChild(routes)
    ],
    exports:[
        NativeScriptRouterModule
    ]
})
export class ExploreRoutingModule{

}