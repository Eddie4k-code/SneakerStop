export interface ISneakerUpdated {
    data: {
        _id: string;
        version: number;
        title: string;
        price: number;
        userId: string;
        orderId?: string;
    }
}