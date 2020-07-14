import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { PaymentPlansComponent } from "./paymentplans.component";

const routes:Route[] = [
    {path:"",component:PaymentPlansComponent}
]

@NgModule({
    declarations:[
        PaymentPlansComponent,
    ],
    imports:[SharedModule,
        NativeScriptRouterModule.forChild(routes)
    ],
    exports:[
        NativeScriptRouterModule
    ],
    schemas:[
        NO_ERRORS_SCHEMA
    ]
})
export class PaymentPlansModule{

}