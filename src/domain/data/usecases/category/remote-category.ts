import {HttpGetClient} from '../../protocols/http/http-get-client'
export class RemoteCategory {
    constructor(private readonly url: string, private readonly httpGetClient: HttpGetClient) {}
    async handleGetCategoreis(): Promise<void> {
        await this.httpGetClient.get(this.url)
    }
}
