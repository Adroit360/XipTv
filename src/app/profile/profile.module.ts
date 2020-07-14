import { NgModel } from "@angular/forms";
import { ProfileComponent } from "./profile.component";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NgModule } from "@angular/core";

const routes :Route[] = [
    {path:"", component:ProfileComponent}
]

@NgModule({
        declarations:[
            ProfileComponent
        ],
        imports:[
            SharedModule,
            NativeScriptRouterModule.forChild(routes)
        ],
        exports:[
            NativeScriptRouterModule
        ]
})
export class ProfileModule{

}
