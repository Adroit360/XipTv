import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeComponent } from "./home.component";

const routes: Routes = [
    {
        path: "", component: HomeComponent,children: [
            {path:"",redirectTo:"landing",pathMatch:'full'},
            { path: "landing", loadChildren: () => import("~/app/home/landing/landing.module").then((m) => m.LandingModule) },
            {path:'search',loadChildren:()=>import("~/app/home/search/search.module").then(m=>m.LandingModule)},
            { path: "explore", loadChildren: () => import("~/app/home/explore/explore.module").then((m) => m.ExploreModule) },          
            { path: "categories", loadChildren: () => import("~/app/home/category/category.module").then((m) => m.CategoryModule) }          
        ]
    }
];

@NgModule({
    imports:[
        NativeScriptRouterModule.forChild(routes)
    ],
    exports:[
        NativeScriptRouterModule
    ]
})
export class HomeRoutingModules{

}