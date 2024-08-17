import { GenericRequestError } from "@sneakerstop/shared";
import { IPaymentProvider } from "./IPaymentProvider";
import {Stripe} from 'stripe';

/* Concrete implementation of a payment provider (stripe) */
export class StripePaymentProvider implements IPaymentProvider { 
    private readonly _stripe_secret: string;
    private readonly _stripe: Stripe

    constructor(stripe_secret: string) {
        this._stripe_secret = stripe_secret;
        this._stripe = new Stripe(this._stripe_secret, {
            apiVersion: '2024-06-20'
        });

    }

    async createCharge(amount: number): Promise<string> {

        try {

        
        const charge = await this._stripe.charges.create({
            currency: 'usd',
            amount: amount * 100,
            source: 'tok_visa'
        });
        
        

        return charge.receipt_url!;

    } catch(err) {
        console.log(err);
        throw new GenericRequestError("Unable to Process Payment")
    }

    }
}