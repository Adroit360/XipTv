import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
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
    ],
<<<<<<< HEAD
    schemas:[
        NO_ERRORS_SCHEMA
    ]
=======
    // schemas:[
    //     NO_ERRORS_SCHEMA
    // ]
>>>>>>> 3696cf9750fe3bf4810c26ba70ad229d90ea1151
})
export class RegisterModule{

}
