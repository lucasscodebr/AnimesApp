import {HttpGetClient} from '../protocols/http/http-get-client'

export class HttpGetClientSpy implements HttpGetClient {
    public url?: string

    get(url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
    }
}
