import { ISneaker } from "../../models/sneaker";


/* abstracts the data access operations */

export interface ISneakerRepository<T> {
    newSneaker(attrs: ISneaker): Promise<T>
    allSneakers(): Promise<T[]>
    updateSneaker(id: string, updatedFields: Partial<T>): Promise<T | null>
    viewSneaker(id: string): Promise<T | null>
}