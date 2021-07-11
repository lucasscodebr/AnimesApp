import {HttpGetClient} from '../../protocols/http/http-get-client'
export class RemoteCategory {
    private readonly url: string
    private readonly httpGetClient: HttpGetClient

    constructor(url: string, httpGetClient: HttpGetClient) {
        this.url = url
        this.httpGetClient = httpGetClient
    }

    async handleGetCategoreis(): Promise<void> {
        return await this.httpGetClient.getAll(this.url)
    }

    async handleGetCategoryById(id: string) {
        return await this.httpGetClient.getOne(this.url, id)
    }
}
