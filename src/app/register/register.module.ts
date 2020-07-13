import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register.component";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes:Route[] = [
    {path:"",component:RegisterComponent}
]

@NgModule({
    declarations:[
        RegisterComponent,
    ],
    imports:[SharedModule,
        NativeScriptRouterModule.forChild(routes)
    ],
    exports:[
        NativeScriptRouterModule
    ]
})
export class RegisterModule{

}