import { ISneaker } from "../../models/sneaker"

export interface ISneakerService<T> {
    newSneaker(attrs: ISneaker, Headers?: Record<string, string>): Promise<T>
    allSneakers(): Promise<T[]>
    updateSneaker(id: string, userId: string,  updatedFields: Partial<T>): Promise<T | null>
    viewSneaker(id: string): Promise<T | null>
}