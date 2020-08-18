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
import { Router } from "@angular/router";

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
        private routerExtensions:RouterExtensions,
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
            loginResponse => {
                this.isLoading = false;
                if(this.authService.isDeviceAllowed(loginResponse.deviceIdentifier)){
                    console.log("A-------------");
                    this.performLoginActions(loginResponse);
                }else{
                    if(loginResponse.deviceIdentifier == 1){
                        console.log("B------------");
                        this.performLoginActions(loginResponse);
                        this.authService.changeDeviceIdentifier(loginResponse.user.id)
                        .subscribe(response=>{
                            console.log("Login Response Changed",response.deviceIdentifier);
                            this.authService.setLocalDeviceIdentifier(response.deviceIdentifier);
                        });

                    }else{
                        console.log("C-------------");
                        this.miscService.confirm("Switch Devices","Are you sure you want to log out of all other devices")
                        .then(confirmResponse=>{
                            if(confirmResponse){
                                this.authService.changeDeviceIdentifier(loginResponse.user.id)
                                .subscribe(response=>{
                                    loginResponse.deviceIdentifier = response.deviceIdentifier;
                                    this.performLoginActions(loginResponse);
                                    this.isLoading = false;
                                });
                            }else{
                                this.isLoading = false;
                            }
                        });
                        
                    }
                }
                
            }, error => {
                this.isLoading = false;
                this.miscService.alert("Error", error);
            }
        );
    }

    performLoginActions(loginResponseDTO:LoginResponseDTO){
        this.miscService.showToast("Login Successful");
        this.saveloginResponse(loginResponseDTO.token, loginResponseDTO.user,loginResponseDTO.deviceIdentifier);
        this.router.navigate(["sub-type"],
        {
            animated: true,
            transition: { name: 'fade' }
          })
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

    saveloginResponse(token, user,deviceIdentifier) {
        applicationStorage.setString("token", token);
        applicationStorage.setString("user", JSON.stringify(user));
        this.authService.setLocalDeviceIdentifier(deviceIdentifier);
    }

    submitLogin(loginDTO: LoginDTO): Observable<LoginResponseDTO> {
        return this.authService.login(loginDTO);
    }

    gotoRegister() {
        this.router.navigate(['register']);
    }

    public navigate(link: string): void {
        this.routerExtensions.navigate([link], {
          animated: true,
          transition: { name: 'fade' }
        });
      }
}
