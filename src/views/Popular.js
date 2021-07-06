import React from 'react'
import {FlatList} from 'react-native'
import {Container} from '../styles/views/Popular'
import server from '../services/api'
import {Header, MiniCard} from '../components'
import url from '../config/urls'
import err from '../class/Errors'

class Popular extends React.Component {
    constructor(props) {
        super(props)
        this.initialState = {listAnimes: [], pageNumber: 0}
        this.state = {...this.initialState}
    }

    async handleGetPopularAnimes() {
        try {
            const response = await server.get(
                url.ANIMES_URL + 'find/?orderBy=DESC',
            )
            if (this.state.listAnimes.length == 0) {
                this.setState({listAnimes: response.data})
            } else {
                this.setState({
                    listAnimes: [...this.state.listAnimes, ...response.data],
                })
            }
            this.setState({pageNumber: this.state.pageNumber + 50})
        } catch (error) {
            err.sendPostErrorToApi('handleGetPopularAnimes', error)
        }
    }

    componentDidMount() {
        this.handleGetPopularAnimes()
    }

    render() {
        return (
            <>
                <Header {...this.props} title={'POPULAR'}></Header>
                <Container>
                    {this.state.listAnimes && (
                        <FlatList
                            data={this.state.listAnimes}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({item: anime}) => (
                                <MiniCard
                                    anime={anime}
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            'Anime',
                                            {anime},
                                        )
                                    }
                                />
                            )}
                            numColumns={3}
                            onEndReached={() => this.handleGetPopularAnimes()}
                            onEndReachedThreshold={0.5}
                        />
                    )}
                </Container>
            </>
        )
    }
}

export default Popular
