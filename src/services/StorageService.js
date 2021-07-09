import AsyncStorage from '@react-native-async-storage/async-storage'

export class StorageService {
    constructor() {
        this.key = '@favorite'
        this.instance = null
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new StorageService()
        }
        return this.instance
    }

    async getFavorite() {
        const result = await AsyncStorage.getItem(this.key)
        return !result ? [] : JSON.parse(result)
    }

    saveFavorite(json) {
        AsyncStorage.setItem(this.key, JSON.stringify(json))
    }

    async saveOneFavorite(item) {
        const result = await this.getFavorite()
        result.push(item)
        this.saveFavorite(result)
    }

    async deleteFavorite(id) {
        const result = await this.getFavorite()
        const removed = result.filter((obj) => obj.id !== id)
        await this.saveFavorite(removed)
    }

    async findFavoriteByAnimeId(id) {
        const result = await this.getFavorite()
        return result.find((obj) => obj.id === id)
    }
}
