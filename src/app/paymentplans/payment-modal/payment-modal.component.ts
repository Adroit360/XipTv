import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/common";
import { PackageType } from "~/data/models/packagetype";
import { AuthService } from "~/services/auth.service";
import { PaymentDTO } from "~/data/dtos/paymentDTO";
import { HttpClient } from "@angular/common/http";
import { settings } from "~/helpers/settings";
import { MiscService } from "~/services/misc.service";

@Component({
    selector: "app-payment-modal",
    templateUrl: "./payment-modal.component.html",
    styleUrls: ["./payment-modal.component.scss"]
})
export class PaymentModalComponent {
    packages = PackageType;
    packageType: PackageType;

    checkoutResponse: { txRef, paymentToken };
    checkoutUrl: any;
    isLoading = false;

    constructor(private modalDialogParams: ModalDialogParams,
        private httpClient: HttpClient,
        private miscService:MiscService,
        private authService: AuthService) {
        this.packageType = modalDialogParams.context;

        if (this.packageType != PackageType.Trial)
            this.pay();
    }

    pay() {

        if (this.packageType == PackageType.Trial) {
            this.modalDialogParams.closeCallback({
                paid: true
            });
            return;
        }
        var user = this.authService.currentUser;

        var paymentDTO = new PaymentDTO();
        paymentDTO.txRef = this.getUniqueCode(user.name),
            paymentDTO.packageType = this.packageType,
            paymentDTO.userId = user.id;


        this.httpClient.post<{ txRef, paymentToken }>(`${settings.baseUri}/transaction/pay`, paymentDTO)
            .subscribe(response => {
                console.log(response);
                let redirectUrl = settings.tellerCallbackUrlPrefix + response.paymentToken;
                //this.checkoutUrl = this.sanitizer.bypassSecurityTrustResourceUrl(redirectUrl);
                this.checkoutUrl = redirectUrl;
                this.checkoutResponse = response;
            }, error => {
                console.log(error);
                this.miscService.alert("Error","Cannot contact payment server at the moment, please try again in a few minutes")
                .then(response=>{
                    this.closeModal();
                });

            });

            

    }

    getUniqueCode(username): string {
        var userCode = username.substr(0, 2);
        return `inv.${userCode}.${this.createUUID()}`;
    }

    createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    closeModal() {
        this.modalDialogParams.closeCallback({
            paid: false
        });
    }

    webViewLoading(event) {
        this.isLoading = true;
        if(event.url && event.url.includes("status=failed")){
            this.modalDialogParams.closeCallback({
                paid: false
            });
        }else if(event.url && event.url.includes("status=successful")){
            this.modalDialogParams.closeCallback({
                paid: true
            });
        }
    }

    webViewLoaded(event) {
        this.isLoading = false;
    }
}