import React from 'react'
import {FlatList} from 'react-native'
import {Container} from '../styles/views/Popular'
import {Header, MiniCard} from '../components'
import AxiosServices from '../services/AxiosService'

class Popular extends React.Component {
    constructor(props) {
        super(props)
        this.initialState = {listAnimes: [], pageNumber: 0}
        this.state = {...this.initialState}
        this.http = AxiosServices.getInstance()
    }

    async handleGetPopularAnimes() {
        try {
            const response = this.http.findAnimesRecents()
            if (this.state.listAnimes.length === 0) {
                this.setState({listAnimes: response})
            } else {
                this.setState({
                    listAnimes: [...this.state.listAnimes, ...response],
                })
            }
            this.setState({pageNumber: this.state.pageNumber + 50})
        } catch (error) {
            this.http.saveError('handleGetPopularAnimes', error)
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
                            renderItem={({item: anime}) => <MiniCard anime={anime} onPress={() => this.props.navigation.navigate('Anime', {anime})} />}
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
