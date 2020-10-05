import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import { CustomActionBarComponent } from "./action-bar/action-bar.component";
import { UniversalService } from "~/services/universal.service";
import { TvListModalComponent } from "../home/category/tvlist-modal/tvlist-modal.component";
import { PaymentModalComponent } from "../paymentplans/payment-modal/payment-modal.component";
import { TNSImageModule } from 'nativescript-image/angular';
import { registerElement } from "nativescript-angular";
//registerElement("Image", () => require("nativescript-web-image-cache").Image);
import * as imageModule from 'nativescript-image';
import * as applicationModule from 'tns-core-modules/application';
import { AllStreamsComponent } from "../all-streams/allstreams.component";

if (applicationModule.android) {
    applicationModule.on(applicationModule.launchEvent, () => {
        console.log('initialize pipeline');
        imageModule.initialize();
    });
}

@NgModule({
    declarations:[
        CustomActionBarComponent,
        TvListModalComponent,
        PaymentModalComponent,
        AllStreamsComponent
    ],
    imports:[
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        TNSImageModule
    ],
    exports:[

        NativeScriptCommonModule,
        CustomActionBarComponent,
        NativeScriptFormsModule,
        TNSImageModule

    ],
    providers:[
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule{
    constructor(){
        
    }
}