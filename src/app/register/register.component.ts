import { Component, OnInit, ViewChild, ElementRef, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ModalDialogService } from 'nativescript-angular/common';
import { UniversalService } from '~/services/universal.service';
import { Page, isIOS, Color } from 'tns-core-modules/ui/page/page';
import { AuthService } from '~/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { RegisterDTO } from '~/data/dtos/registerDto';
import * as applicationStorage from "tns-core-modules/application-settings";
import { LoginResponseDTO } from '~/data/dtos/loginResponseDTO';
import { Observable } from "rxjs";
import { prompt, PromptOptions, PromptResult, inputType, capitalizationType } from 'tns-core-modules/ui/dialogs/dialogs';
import { MiscService } from '~/services/misc.service';


@Component({
    selector: 'ns-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    selections = { admin: true, manager: false };
    isLoading = false;
    constructor(private router: RouterExtensions,
        private page: Page,
        private authService: AuthService,
        private miscService:MiscService,
        private universalService: UniversalService) {
            page.actionBarHidden = true;
         }

    username: string;
    email: string;
    password: string;
    registerForm: FormControl;
    productBankSelectedIds: [];
    token: string;

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    register() {
        this.router.navigate(["payment-plan"],{
            clearHistory:true
        });

        return;
        this.isLoading = true;
        var registerDTO: RegisterDTO = {
            "username": this.username,
            "email": this.email,
            "password": this.password,
            productsToSell: [],
            token: ""
        }
        if (!this.validateFields()) {
            this.isLoading = false;
            return;
        }
        this.submitRegisteration(registerDTO).subscribe(
            response => {
                this.isLoading = false;
                this.saveloginResponse(response.token, response.user);
                this.miscService.showToast("Registeration Successful");
                this.router.navigate(["home"], { clearHistory: true });
            }, error => {
                this.isLoading = false;

                this.miscService.alert("Error", error);
            }
        );
    }

    gotoLogin(){
        this.router.navigate(["login"]);
    }

    submitRegisteration(registerDTO: RegisterDTO): Observable<LoginResponseDTO> {
        return this.authService.register(registerDTO);
    }

    validateFields() {
        if (!this.username) {
            this.miscService.showToast("Please provide a username");
            return false;
        } else if (!this.email) {
            this.miscService.showToast("Please provide an email address");
            return false;
        } else if (!this.password) {
            this.miscService.showToast("Please provide a password");
            return false;
        }
        return true;
    }

    saveloginResponse(token, user) {
        applicationStorage.setString("token", token);
        applicationStorage.setString("user", JSON.stringify(user));
    }

}
