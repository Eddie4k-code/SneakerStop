/* Possible Statuses an order could have */

export enum OrderStatus {
    Created = 'created',
    Cancelled = 'cancelled',
    Complete = 'complete',
    PendingPayment = 'PendingPayment'
}