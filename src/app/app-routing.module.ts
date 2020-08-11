import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import {PlayerComponent} from "./player/player.component";
import { GetStartedComponent } from "./get-started/get-started.component";
import { LiveSportsComponent } from "./livesports/livesports.component";

const routes: Routes = [
    // {path:"",redirectTo:"home",pathMatch:'full'},
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "player", loadChildren: () => import("~/app/player/player.module").then((m) => m.PlayerModule) },
    {path:"register",loadChildren:()=>import("~/app/register/register.module").then((m)=>m.RegisterModule)},
    {path:"login",loadChildren:()=>import("~/app/login/login.module").then(m=>m.LoginModule)},
    {path:"get-started",loadChildren:()=>import("~/app/get-started/get-started.module").then(m=>m.GetStartedModule)},
    {path:"payment-plan",loadChildren:()=>import("~/app/paymentplans/paymentplans.module").then(m=>m.PaymentPlansModule)},
    {path:"sub-expired",loadChildren:()=>import("~/app/sub-expired/sub-expired.module").then(m=>m.SubExpiredModule)},
    {path:"profile",loadChildren:()=>import("~/app/profile/profile.module").then(m=>m.ProfileModule)},
    {path:"sub-type",redirectTo:"sub-type/true"},
    {path:"sub-type/:redirect",loadChildren:()=>import("~/app/sub-type/sub-type.module").then(m=>m.SubTypeModule)},
    {path:"home/livesports",component:LiveSportsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
