import { PackageType } from "../models/packagetype";

export class PaymentDTO{
    constructor(init?:Partial<PaymentDTO>) {
        Object.assign(this,init);
    }
    txRef:string;
    userId:string;
    packageType:PackageType
}