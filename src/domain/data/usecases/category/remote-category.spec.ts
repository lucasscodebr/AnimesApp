import {HttpGetClientSpy} from '../../test/mock-http-client'
import {RemoteCategory} from './remote-category'
import faker from 'faker'

type SutTypes = {
    sut: RemoteCategory
    httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteCategory(url, httpGetClientSpy)
    return {sut, httpGetClientSpy}
}

describe('RemoteCategory', () => {
    test('Should call HttpClient with correct URL', async () => {
        const url = faker.internet.url()
        const {sut, httpGetClientSpy} = makeSut(url)
        await sut.handleGetCategoreis()
        expect(httpGetClientSpy.url).toBe(url)
    })

    test('Should call HttpClient with correct ID', async () => {
        const url = faker.internet.url()
        const id = 'any_id'
        const {sut, httpGetClientSpy} = makeSut(url)
        await sut.handleGetCategoryById(id)
        expect(httpGetClientSpy.id).toBe(id)
    })
})
