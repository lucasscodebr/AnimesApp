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
        return await AsyncStorage.getItem(this.key)
    }
}
