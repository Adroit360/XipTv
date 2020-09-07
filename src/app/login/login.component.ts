import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { AuthService } from "~/services/auth.service";
import { MiscService } from "~/services/misc.service";
import { LoginDTO } from "~/data/dtos/loginDTO";
import { Observable } from "rxjs";
import * as applicationStorage from "tns-core-modules/application-settings";
import { LoginResponseDTO } from "~/data/dtos/loginResponseDTO";
import { TvListService } from "~/services/tvlist.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {

    isLoading: boolean = false;
    loginModel: LoginDTO = {
        email: "",
        password: "",
        rememberMe: false
    }
    constructor(private router: RouterExtensions,
        private authService: AuthService,
        private miscService: MiscService,
        private tvListService: TvListService,
        private page: Page) {
        page.actionBarHidden = true;


    }

    ngOnInit(): void {

    }

    login() {
        this.isLoading = true;
        if (!this.validateFields()) {
            this.isLoading = false;
            return;
        }
        this.submitLogin(this.loginModel).subscribe(
            response => {
                this.isLoading = false;
                this.miscService.showToast("Login Successful");
                this.saveloginResponse(response.token, response.user);
                this.router.navigate(["sub-type"],
                {
                    animated: true,
                    transition: { name: 'fade' }
                  })
            }, error => {
                this.isLoading = false;
                this.miscService.alert("Error", error);
            }
        );
    }

    validateFields() {
        if (!this.loginModel.email) {
            this.miscService.showToast("Please provide a username");
            return false;
        } else if (!this.loginModel.password) {
            this.miscService.showToast("Please provide a password");
            return false;
        }
        return true;
    }

    saveloginResponse(token, user) {
        applicationStorage.setString("token", token);
        applicationStorage.setString("user", JSON.stringify(user));
    }

    submitLogin(loginDTO: LoginDTO): Observable<LoginResponseDTO> {
        return this.authService.login(loginDTO);
    }

    gotoRegister() {
        this.router.navigate(['register']);
    }

    public navigate(link: string): void {
        // Used to be routerExtensions
        this.router.navigate([link], {
          animated: true,
          transition: { name: 'fade' }
        });
      }
}
