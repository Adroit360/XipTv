import { Subscription } from "~/data/models/subscriptions";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { settings } from "~/helpers/settings";
import { Package } from "~/data/models/package";

@Injectable()
export class SubscriptionService {
    defaultPackages: Package[];


    constructor(private httpClient: HttpClient) {
    }

    addSubscripton(userId:string,packageId:number) {
        return this.httpClient.post<Subscription>(`${settings.baseUri}/subscription/add/${userId}/${packageId}`, {});
    }


    async getDefaultPackages(): Promise<Package[]> {
        return new Promise((resolve, reject) => {
            if (this.defaultPackages)
                resolve(this.defaultPackages);

            this.httpClient.get<Package[]>(`${settings.baseUri}/subscription/getdefaultpackages`)
                .subscribe(response => {
                    this.defaultPackages = response;
                    resolve(response);
            });

        });
    }

}