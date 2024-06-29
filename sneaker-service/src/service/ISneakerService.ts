import { ISneaker } from "../../models/sneaker"

export interface ISneakerService<T> {
    newSneaker(attrs: ISneaker): Promise<T>
    allSneakers(): Promise<T[]>
    updateSneaker(id: string, userId: string,  updatedFields: Partial<T>): Promise<T | null>
    viewSneaker(id: string): Promise<T | null>
}