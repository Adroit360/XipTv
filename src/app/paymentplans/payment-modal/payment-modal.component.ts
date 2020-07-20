import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/common";

@Component({
    selector:"app-payment-modal",
    templateUrl:"./payment-modal.component.html",
    styleUrls:["./payment-modal.component.scss"]
})
export class PaymentModalComponent{
    constructor(private modalDialogParams:ModalDialogParams){

        
    }

    pay(){
        this.modalDialogParams.closeCallback({
            paid:true
        });
    }

    closeModal(){
        this.modalDialogParams.closeCallback({
            paid:false
        });
    }
}