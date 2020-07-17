import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import { CustomActionBarComponent } from "./action-bar/action-bar.component";
import { UniversalService } from "~/services/universal.service";
import { TvListModalComponent } from "../home/category/tvlist-modal/tvlist-modal.component";

@NgModule({
    declarations:[
        CustomActionBarComponent,
        TvListModalComponent
    ],
    imports:[
        NativeScriptCommonModule,
        NativeScriptFormsModule
    ],
    exports:[
        NativeScriptCommonModule,
        CustomActionBarComponent,
        NativeScriptFormsModule
    ],
    providers:[
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule{

}