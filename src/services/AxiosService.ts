import Axios from '../config/AxiosConfig'

export class AxiosService {
    private http: any

    constructor() {
        this.http = Axios
    }

    static getInstance(): AxiosService {
        return new AxiosService()
    }

    async searchAnimes(name: string, category: string, age: string, page: number, size: number, orderBy: string) {
        name = name || ''
        category = category || ''
        age = age || ''
        page = page || 0
        size = size || 50
        orderBy = orderBy || 'DESC'

        try {
            const response = await this.http.get('animes/find/?name=' + name + '&category=' + category + '&age=' + age + '&page=' + page + '&size=' + size + '&orderBy=' + orderBy)
            return response.data
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findAllByCategory(category: string, page: number) {
        return await this.searchAnimes(null, category, null, page)
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
        return await this.searchAnimes(null, null, age, page)
    }

    async findAnimesRecents() {
        return await this.searchAnimes()
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
