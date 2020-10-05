import { Component, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { login } from "tns-core-modules/ui/dialogs";
import { MiscService } from "~/services/misc.service";

@Component({
    selector: "app-get-started",
    templateUrl: "./get-started.component.html",
    styleUrls: ["./get-started.component.scss"]
})
export class GetStartedComponent {

    @ViewChild("thebutton",{static:true}) theButton : ElementRef;
    @ViewChild("block1",{static:true}) block1 : ElementRef;
    @ViewChild("block2",{static:true}) block2 : ElementRef;


    constructor(private routerExtensions: RouterExtensions,
        public miscService:MiscService,
        private page:Page) {
            page.actionBarHidden = true;
    }

    login() {
        this.routerExtensions.navigate(["login"], {
            clearHistory: true,
            animated: true,
            transition: { name: 'fade' }
        });
    }

    run(){
        console.log("This is a " + this.block1)
        this.block1.nativeElement.animate({
            translate: {x:-5000, y:10},
            duration: 4000
        })

        this.block2.nativeElement.animate({
            translate: {x:-5000, y:10},
            duration: 3000,
            delay: 100
        })

        this.theButton.nativeElement.animate({
            translate: {x:-5000, y:10},
            duration: 3000,
            delay: 200
        })


        setTimeout(() => {
            // login()
        }, 1000);
    }
            // setTimeout( login(){
            //     this.routerExtensions.navigate(["login"], {
            //         clearHistory: true
            //     });
            // }, 5000;)


}
