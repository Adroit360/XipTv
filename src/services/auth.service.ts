import * as appStorage from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { Injectable } from "@angular/core";
import { UserForReturnDTO } from "~/data/dtos/userForReturnDTO";
import { HttpClient } from "@angular/common/http";
import { RegisterDTO } from "~/data/dtos/registerDto";
import { Observable } from "rxjs";
import { LoginResponseDTO } from "~/data/dtos/loginResponseDTO";
import { settings } from "~/helpers/settings";
import { LoginDTO } from "~/data/dtos/loginDTO";

@Injectable()
export class AuthService {
    currentUser: UserForReturnDTO;
    constructor(private httpClient: HttpClient, private router: RouterExtensions) {
        this.getCurrentUser();
        if (this.currentUser) {
            this.router.navigate(["home"], { clearHistory: true });
        }
    }

    register(registerDTO: RegisterDTO): Observable<LoginResponseDTO> {
        return this.httpClient.post<LoginResponseDTO>(`${settings.baseUri}/api/auth/register`, registerDTO);
    }

    login(loginDTO: LoginDTO): Observable<LoginResponseDTO> {
        return this.httpClient.post<LoginResponseDTO>(`${settings.baseUri}/api/auth/login`, loginDTO);
    }

    getCurrentUser():UserForReturnDTO{
        if (this.currentUser)
            return this.currentUser;
            
        var userString = appStorage.getString("user");
        if (userString) {
            this.currentUser = JSON.parse(userString);
            return this.currentUser
        } else {
            this.logout();
            return undefined;
        }
    }

    logout() {
        this.currentUser = null;
        appStorage.remove("user");
        appStorage.remove("token");
    }
}