import {HttpGetClient} from '../../protocols/http/http-get-client'
export class RemoteCategory {
    private readonly url: string
    private readonly httpGetClient: HttpGetClient

    constructor(url: string, httpGetClient: HttpGetClient) {
        this.url = url
        this.httpGetClient = httpGetClient
    }

    async handleGetCategoreis(): Promise<void> {
        await this.httpGetClient.get(this.url)
    }
}
