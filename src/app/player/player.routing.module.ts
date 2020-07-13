import { NgModule } from "@angular/core";
import { PlayerComponent } from "./player.component";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
const routes:Route[]=[
    {path:"",component:PlayerComponent}
]
@NgModule({
    imports:[
        NativeScriptRouterModule.forChild(routes)
    ],
    exports:[
        NativeScriptRouterModule
    ]
})
export class PlayerRoutingModule{

}