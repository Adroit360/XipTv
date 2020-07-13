import { NgModel } from "@angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { PlayerComponent } from "./player.component";
import { SharedModule } from "../shared/shared.module";
import { PlayerRoutingModule } from "./player.routing.module";

@NgModule({
    declarations:[
        PlayerComponent
    ],
    imports:[
        SharedModule,
        PlayerRoutingModule
    ],
    exports:[
        PlayerRoutingModule
    ],
    schemas:[
        NO_ERRORS_SCHEMA
    ]
})
export class PlayerModule{

}