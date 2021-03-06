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
import { SubscriptionService } from "~/services/subscription.service";
import { PaymentModalComponent } from "./paymentplans/payment-modal/payment-modal.component";
import { LiveSportsComponent } from "./livesports/livesports.component";
import { NativeScriptMaterialButtonModule } from "nativescript-material-button/angular";

// import { GifModule } from 'tns-ng-gif';
import * as application from "tns-core-modules/application";
import { AllStreamsComponent } from "./all-streams/allstreams.component";
//var imageCache = require("nativescript-web-image-cache");

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        HomeModule,
        PlayerModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptMaterialButtonModule

        // GifModule
    ],
    declarations: [
        AppComponent,
        LiveSportsComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        {provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor,multi: true},
        TvListService,UniversalService,AuthService,MiscService,SubscriptionService],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents:[TvListModalComponent,PaymentModalComponent,AllStreamsComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {

    constructor(){
        // if (application.android) {
        //     application.on("launch", function () {
        //         imageCache.initialize();
        //     });
        // }
    }
 }
