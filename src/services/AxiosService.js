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
