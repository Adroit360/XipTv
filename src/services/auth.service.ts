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
    _currentUser: UserForReturnDTO;

    set currentUser(value: UserForReturnDTO) {
        this._currentUser = value;
    }

    get currentUser(): UserForReturnDTO {
        if (this._currentUser) {
            return this._currentUser
        } else {
            this.getCurrentUser();
            return this._currentUser;
        }
    };

    constructor(private httpClient: HttpClient,
        private router: RouterExtensions) {

    }

    register(registerDTO: RegisterDTO): Observable<LoginResponseDTO> {
        return this.httpClient.post<LoginResponseDTO>(`${settings.baseUri}/auth/register`, registerDTO);
    }

    login(loginDTO: LoginDTO): Observable<LoginResponseDTO> {
        return this.httpClient.post<LoginResponseDTO>(`${settings.baseUri}/auth/login`, loginDTO);
    }

    changeDeviceIdentifier(userId) {
        return this.httpClient.get<{ deviceIdentifier }>(`${settings.baseUri}/auth/changeidentifier/${userId}`);
    }

    getCurrentUser(): UserForReturnDTO {
        var userString = appStorage.getString("user");
        if (userString) {
            this.currentUser = JSON.parse(userString);
            return this.currentUser
        } else {
            this.logout();
            return undefined;
        }
    }

    getLocalDeviceIdentifier(): string {
        var id = appStorage.getString("deviceIdentifier");
        console.log("localId", id);
        return id;
    }

    setLocalDeviceIdentifier(deviceIdentifier: number) {
        var id = deviceIdentifier.toString();
        if (id)
            appStorage.setString("deviceIdentifier", id);
    }

    logout() {
        this.currentUser = null;
        appStorage.remove("user");
        appStorage.remove("token");
        this.router.navigate(["login"], {
            clearHistory: true
        })
    }

    isDeviceAllowed(deviceIdentifier) {
        return this.getLocalDeviceIdentifier() == deviceIdentifier;
    }

    getRemoteDeviceIdentifier(userId) {
        return this.httpClient.get<{ deviceIdentifier }>(`${settings.baseUri}/auth/getidentifier/${userId}`);
    }

}