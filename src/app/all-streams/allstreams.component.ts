import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogParams, RouterExtensions } from "nativescript-angular";
import { MiscService } from "~/services/misc.service";

@Component({
    selector: 'ns-allstreams',
    templateUrl: './allstreams.component.html',
    styleUrls: ['./allstreams.component.scss']
})



export class AllStreamsComponent {

    matchName: string;
    streams: [];

    constructor(private modalParams: ModalDialogParams,
        public miscService:MiscService,
        private routerExtensions: RouterExtensions) {
        var data = modalParams.context;

        this.matchName = data.name;

        this.streams = data.streams.map(i => i.split("*"));
    }


    close() {
        this.modalParams.closeCallback();
    }

    openPlayer(url) {
        this.modalParams.closeCallback({
            name:this.matchName,
            url
        });
    }

}