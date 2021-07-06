import React from 'react'
import {FlatList} from 'react-native'
import {Header, MiniCard} from '../components'
import {Container} from '../styles/views/Favorite'
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
        return (
            <>
                <Header {...this.props} title={'MINHA LISTA'} />
                <Container>
                    {this.state.listAnimes && (
                        <FlatList
                            data={this.state.listAnimes}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({item: anime}) => <MiniCard anime={anime} onPress={() => this.props.navigation.navigate('Anime', {anime})} />}
                            numColumns={3}
                        />
                    )}
                </Container>
            </>
        )
    }
}

export default (props) => {
    const isFocused = useIsFocused()
    return <Favorites {...props} isFocused={isFocused} />
}
