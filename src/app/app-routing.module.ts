import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import {PlayerComponent} from "./player/player.component";

const routes: Routes = [
    // {path:"",redirectTo:"home",pathMatch:'full'},
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "player", loadChildren: () => import("~/app/player/player.module").then((m) => m.PlayerModule) },
    {path:"register",loadChildren:()=>import("~/app/register/register.module").then((m)=>m.RegisterModule)},
    {path:"login",loadChildren:()=>import("~/app/login/login.module").then(m=>m.LoginModule)},
    {path:"get-started",loadChildren:()=>import("~/app/get-started/get-started.module").then(m=>m.GetStartedModule)}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
