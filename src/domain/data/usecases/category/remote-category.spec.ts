import {HttpGetClientSpy} from '../../test/mock-http-client'
import {RemoteCategory} from './remote-category'

describe('RemoteCategory', () => {
    test('Should call HttpClient with correct URL', async () => {
        const url = 'any_thing'
        const httpGetClientSpy = new HttpGetClientSpy()
        const sut = new RemoteCategory(url, httpGetClientSpy)
        await sut.handleGetCategoreis()
        expect(httpGetClientSpy.url).toBe(url)
    })
})
