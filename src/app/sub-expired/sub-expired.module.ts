import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";
import { SubExpiredComponent } from "./sub-expired.component";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes :Route[] = [
    {path:"",component:SubExpiredComponent}
]

@NgModule({
    declarations:[
        SubExpiredComponent
    ],
    imports:[
        SharedModule,
        NativeScriptRouterModule.forChild(routes)
    ],
    exports:[
        NativeScriptRouterModule
    ]
})
export class SubExpiredModule{

}
