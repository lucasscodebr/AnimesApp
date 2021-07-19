import Axios from '../config/axios-config'

export class AxiosService {
    private readonly http: any
    private static instance: AxiosService

    constructor() {
        this.http = Axios
    }

    static getInstance(): AxiosService {
        if (AxiosService.instance) {
            AxiosService.instance = new AxiosService()
        }
        return AxiosService.instance
    }

    async searchAnimes(name: string = '', category: string = '', age: string = '', page: number = 0, size: number = 50, orderBy: string = 'DESC') {
        try {
            const response = await this.http.get('animes/find/?name=' + name + '&category=' + category + '&age=' + age + '&page=' + page + '&size=' + size + '&orderBy=' + orderBy)
            return response.data
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findAllByCategory(category: string, page: number) {
        return await this.searchAnimes(undefined, category, undefined, page, undefined, undefined)
    }

    async findAllCategory() {
        try {
            const response = await this.http.get('category')
            return response.data
        } catch (error) {
            return []
        }
    }

    async findAnimesByYear(age: string, page: number) {
        return await this.searchAnimes(undefined, undefined, age, page, undefined, undefined)
    }

    async findAnimesRecents() {
        return await this.searchAnimes(undefined, undefined, undefined, undefined, undefined, undefined)
    }

    async findAllAnimes(page: number) {
        try {
            const response = await this.http.get('animes?page=' + page)
            return response.data
        } catch (error) {
            return []
        }
    }

    async findEpisodesByAnimeId(id: number) {
        try {
            const response = await this.http.get('episodes/' + id + '/list')
            return response.data
        } catch (error) {
            return []
        }
    }

    async saveError(methodName: string, errorMessage: any, title = null) {
        if (typeof errorMessage === 'object') {
            errorMessage = errorMessage.toString()
        }
        console.log('send error : ' + errorMessage)
        try {
            const payload = {
                method: methodName,
                error: errorMessage,
                title,
            }
            const response = await this.http.post('errors', payload)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
}
