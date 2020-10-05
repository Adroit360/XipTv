import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "../../shared/shared.module";
import { CategoryComponent } from "./category.component";
import { CategoryRoutingModule } from "./category.routing.module";

@NgModule({
    declarations:[
        CategoryComponent
    ],
    imports:[
        CategoryRoutingModule,
        SharedModule
    ],
    exports:[
        CategoryRoutingModule
    ],
    schemas:[
        NO_ERRORS_SCHEMA
    ]
})
export class CategoryModule{

}