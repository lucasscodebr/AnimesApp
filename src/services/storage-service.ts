import AsyncStorage from '@react-native-async-storage/async-storage'

export class StorageService {
    private readonly key: string
    private static instance: StorageService

    constructor() {
        this.key = '@favorite'
    }

    static getInstance() {
        if (StorageService.instance) {
            StorageService.instance = new StorageService()
        }
        return StorageService.instance
    }

    async getFavorite() {
        const result = await AsyncStorage.getItem(this.key)
        return !result ? [] : JSON.parse(result)
    }

    saveFavorite(json: string) {
        AsyncStorage.setItem(this.key, JSON.stringify(json))
    }

    async saveOneFavorite(item: string) {
        const result = await this.getFavorite()
        result.push(item)
        this.saveFavorite(result)
    }

    async deleteFavorite(id: string) {
        const result = await this.getFavorite()
        const removed = result.filter((obj: any) => obj.id !== id)
        await this.saveFavorite(removed)
    }

    async findFavoriteByAnimeId(id: string) {
        const result = await this.getFavorite()
        return result.find((obj: any) => obj.id === id)
    }
}
