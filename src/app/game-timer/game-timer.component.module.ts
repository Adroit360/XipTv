import { NgModel } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { GameTimerComponent } from "../game-timer/game-timer.component";

const routes :Route[] = [
    {path:"", component:GameTimerComponent},
]

@NgModule({
        declarations:[
            GameTimerComponent
        ],
        imports:[
            SharedModule,
            NativeScriptRouterModule.forChild(routes)
        ],
        exports:[
            NativeScriptRouterModule
        ],
        schemas:[
            NO_ERRORS_SCHEMA
        ]
})
export class GameTimerModule{
}
