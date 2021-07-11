export interface HttpGetClient {
    getAll(url: string): Promise<void>
    getOne(url: string, id: string): Promise<void>
}
