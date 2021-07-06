import AsyncStorage from '@react-native-async-storage/async-storage'

export default class StorageService {
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
}
