import {HttpGetClient} from '../../protocols/http/http-get-client'
import {RemoteCategory} from './remote-category'

class HttpGetClientSpy implements HttpGetClient {
    public url?: string

    get(url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
    }
}

describe('RemoteCategory', () => {
    test('Should call HttpClient with correct URL', async () => {
        const url = 'any_thing'
        const httpGetClientSpy = new HttpGetClientSpy()
        const sut = new RemoteCategory(url, httpGetClientSpy)
        await sut.handleGetCategoreis()
        expect(httpGetClientSpy.url).toBe(url)
    })
})
