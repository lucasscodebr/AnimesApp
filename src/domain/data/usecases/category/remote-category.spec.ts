import {HttpGetClientSpy} from '../../test/mock-http-client'
import {RemoteCategory} from './remote-category'

type SutTypes = {
    sut: RemoteCategory
    httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url: string = 'any_thing'): SutTypes => {
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteCategory(url, httpGetClientSpy)
    return {sut, httpGetClientSpy}
}
describe('RemoteCategory', () => {
    test('Should call HttpClient with correct URL', async () => {
        const url = 'any_thing'
        const {sut, httpGetClientSpy} = makeSut(url)
        await sut.handleGetCategoreis()
        expect(httpGetClientSpy.url).toBe(url)
    })
})
