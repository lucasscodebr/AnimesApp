import Axios from '../config/AxiosConfig'

export default class AxiosService {
    constructor() {
        this.http = Axios
        this.instance = null
    }

    static getInstance() {
        if (!this.instance) {
            return new AxiosService()
        }
        return this.instance
    }

    async searchAnimes(name, category, age, page, size, orderBy) {
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

    async findAllByCategory(category, page) {
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

    async findAnimesByYear(age, page) {
        return await this.searchAnimes(null, null, age, page)
    }

    async findAnimesRecents() {
        try {
            const response = await this.searchAnimes()
            return response.data
        } catch (error) {
            return []
        }
    }

    async findAllAnimes(page) {
        try {
            const response = await this.http.get('animes?page=' + page)
            return response.data
        } catch (error) {
            return []
        }
    }

    async findEpisodesByAnimeId(id) {
        try {
            const response = await this.http.get('episodes/' + id + '/list')
            return response.data
        } catch (error) {
            return []
        }
    }

    async saveError(methodName, errorMessage, title = null) {
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
