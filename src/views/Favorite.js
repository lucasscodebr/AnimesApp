import React from 'react'
import {FlatList} from 'react-native'
import {Header} from '../components'
import {Container} from '../styles/views/Favorite'
import MiniCard from '../componets/miniCard'
import err from '../class/Errors'
import StorageService from '../services/StorageService'

export default class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listAnimes: [],
        }
    }

    async handleGetAnimesOnStorage() {
        try {
            const jsonResponse = await StorageService.getInstance().getFavorite()
            const response = jsonResponse == null ? [] : JSON.parse(jsonResponse)
            this.setState({listAnimes: response})
        } catch (error) {
            err.sendPostErrorToApi('handleGetAnimesOnStorage', error, 'GET STORAGE ERROR')
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
