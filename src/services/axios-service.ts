import Axios from '../config/axios-config'

export class AxiosService {
    private http: any

    constructor() {
        this.http = Axios
    }

    static getInstance(): AxiosService {
        return new AxiosService()
    }

    async searchAnimes(name: string | null, category: string | null, age: string | null, page: number | null, size: number | null, orderBy: string | null) {
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
        return await this.searchAnimes(null, category, null, page, null, null)
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
        return await this.searchAnimes(null, null, age, page, null, null)
    }

    async findAnimesRecents() {
        return await this.searchAnimes(null, null, null, null, null, null)
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
