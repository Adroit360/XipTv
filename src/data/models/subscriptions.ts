import { Package } from "./package";

export class Subscription{
    subscriptionId:number;
    name:string;
    startDate:Date;
    remainingDays:number;
    userId:string;
    packageId:number;
    Package:Package;
}