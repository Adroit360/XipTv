import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import {PlayerComponent} from "./player/player.component";
import { TvListService } from "~/services/tvlist.service";
import { HomeModule } from "./home/home.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { UniversalService } from "~/services/universal.service";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
 import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { PlayerModule } from "./player/player.module";
import { TvListModalComponent } from "./home/category/tvlist-modal/tvlist-modal.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorService } from "~/interceptors/http.interceptor";
import { JwtInterceptor } from "~/interceptors/jwt.interceptor";
import { AuthService } from "~/services/auth.service";
import { MiscService } from "~/services/misc.service";
import { ErrorInterceptor } from "~/interceptors/error.interceptor";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        HomeModule,
        PlayerModule,
        AppRoutingModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        {provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor,multi: true},
        TvListService,UniversalService,AuthService,MiscService],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents:[TvListModalComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
