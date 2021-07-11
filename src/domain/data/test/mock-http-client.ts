import {HttpGetClient} from '../protocols/http/http-get-client'

export class HttpGetClientSpy implements HttpGetClient {
    public url?: string
    public id?: string

    getAll(url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
    }

    getOne(url: string, id: string): Promise<void> {
        this.id = id
        this.url = url
        return Promise.resolve()
    }
}
