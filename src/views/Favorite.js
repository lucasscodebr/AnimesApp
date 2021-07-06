import React from 'react'
import {RenderCard} from '../components'
import StorageService from '../services/StorageService'
import {useIsFocused} from '@react-navigation/native'

class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listAnimes: [],
        }
        this.storage = StorageService.getInstance()
    }

    async handleGetAnimesOnStorage() {
        try {
            const json = await this.storage.getFavorite()
            this.setState({listAnimes: json})
        } catch (error) {
            this.storage.saveError('handleGetAnimesOnStorage', error, 'GET STORAGE ERROR')
        }
    }

    componentDidUpdate(prev) {
        if (this.props.isFocused !== prev.isFocused) {
            this.handleGetAnimesOnStorage()
        }
    }
    componentDidMount() {
        this.handleGetAnimesOnStorage()
    }

    render() {
        return <RenderCard {...this.props} title={'MINHA LISTA'} list={this.state.listAnimes} />
    }
}

export default (props) => {
    const isFocused = useIsFocused()
    return <Favorites {...props} isFocused={isFocused} />
}
