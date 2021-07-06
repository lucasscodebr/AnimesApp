import React from 'react'
import {FlatList} from 'react-native'
import {Header, MiniCard} from '../components'
import {Container} from '../styles/views/Favorite'
import StorageService from '../services/StorageService'

export default class Favorites extends React.Component {
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

    componentDidMount() {
        this.handleGetAnimesOnStorage()
    }

    render() {
        return (
            <>
                <Header {...this.props} title={'MINHA LISTA'} />
                <Container>
                    {this.state.listAnimes && (
                        <FlatList
                            data={this.state.listAnimes}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({item: anime}) => {
                                return <MiniCard anime={anime} onPress={() => this.props.navigation.navigate('Anime', {anime})} />
                            }}
                            numColumns={3}
                        />
                    )}
                </Container>
            </>
        )
    }
}
