/* abstracts payment operations from concrete implementations such as stripe */


export interface IPaymentProvider {

    createCharge(amount: number): void;

}