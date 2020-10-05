import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    SystemJsNgModuleLoaderConfig,
    OnDestroy,
} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/common";
import { UniversalService } from "~/services/universal.service";
import { Page, isIOS, Color } from "tns-core-modules/ui/page/page";
import { AuthService } from "~/services/auth.service";
import { FormControl, Validators } from "@angular/forms";
import { RegisterDTO } from "~/data/dtos/registerDto";
import * as applicationStorage from "tns-core-modules/application-settings";
import { LoginResponseDTO } from "~/data/dtos/loginResponseDTO";
import { Observable, Subscription } from "rxjs";
import {
    prompt,
    PromptOptions,
    PromptResult,
    inputType,
    capitalizationType,
} from "tns-core-modules/ui/dialogs/dialogs";
import { MiscService } from "~/services/misc.service";
import { KeyboardObserver } from "~/services/keyboard-observer.service";

@Component({
    selector: "ns-register",
    templateUrl: "./register.component.html",
    styleUrls: ["../login/login.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
    @ViewChild("emailField", { static: true }) emailField: ElementRef;
    selections = { admin: true, manager: false };
    isLoading = false;
    extenderHeight = 0;
    keyboardHeight = 0;
    subscriptions: Subscription[] = [];
    constructor(
        private router: RouterExtensions,
        private page: Page,
        private authService: AuthService,
        public miscService: MiscService,
        private keyboardObserver: KeyboardObserver,
        private universalService: UniversalService
    ) {
        page.actionBarHidden = true;

        let kS = keyboardObserver.heightChange$().subscribe((response) => {
            this.keyboardHeight = +response;
        });
        this.subscriptions.push(kS);
    }

    ngOnDestroy(): void {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    username: string;
    email: string;
    password: string;
    registerForm: FormControl;
    token: string;

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    register() {
        this.isLoading = true;
        var registerDTO: RegisterDTO = {
            username: this.username,
            email: this.email,
            password: this.password,
        };
        if (!this.validateFields()) {
            this.isLoading = false;
            return;
        }

        this.submitRegisteration(registerDTO).subscribe(
            (response) => {
                this.isLoading = false;
                this.saveloginResponse(response.token, response.user);
                this.miscService.showToast("Registeration Successful");
                this.router.navigate(["payment-plan"]);
            },
            (error) => {
                this.isLoading = false;

                this.miscService.alert("Error", error);
            }
        );
    }

    gotoLogin() {
        this.router.navigate(["login"]);
    }

    submitRegisteration(
        registerDTO: RegisterDTO
    ): Observable<LoginResponseDTO> {
        return this.authService.register(registerDTO);
    }

    validateFields() {
        if (!this.username) {
            this.miscService.alert("error", "Please provide a username");
            return false;
        } else if (!this.email) {
            this.miscService.alert("error", "Please provide an email address");
            return false;
        } else if (!this.miscService.ValidateEmail(this.email)) {
            this.miscService.alert(
                "error",
                "Please provide a valid email address"
            );
            this.emailField.nativeElement.focus();
            return false;
        } else if (!this.password) {
            this.miscService.alert("error", "Please provide a password");
            return false;
        }
        return true;
    }

    saveloginResponse(token, user) {
        applicationStorage.setString("token", token);
        applicationStorage.setString("user", JSON.stringify(user));
    }

    hideExtender(event) {
        this.extenderHeight = 0;
    }

    showExtender() {
        this.extenderHeight = this.keyboardHeight;
    }
}
