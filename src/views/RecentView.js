import React from 'react'
import {FlatList} from 'react-native'
import {Container} from '../styles/views/Recent'
import MiniCard from '../componets/miniCard'
import server from '../services/api'
import Header from '../componets/header'
import url from '../config/urls'
import err from '../class/Errors'

export default class Recent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listAnimes: [],
        }
    }

    async handleGetRecentAnimes() {
        try {
            const response = await server.get(url.ANIMES_URL)
            this.setState({listAnimes: response.data})
        } catch (error) {
            err.sendPostErrorToApi('handleGetRecentAnimes', error)
        }
    }

    componentDidMount() {
        this.handleGetRecentAnimes()
    }

    render() {
        return (
            <>
                <Header {...this.props} title={'RECENTES'}></Header>
                <Container
                    style={{
                        backgroundColor: '#000',
                        justifyContent: 'space-around',
                    }}>
                    {this.state.listAnimes && (
                        <FlatList
                            data={this.state.listAnimes}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({item: anime}) => {
                                return (
                                    <MiniCard
                                        anime={anime}
                                        onPress={() =>
                                            this.props.navigation.navigate(
                                                'Anime',
                                                {anime},
                                            )
                                        }
                                    />
                                )
                            }}
                            numColumns={3}
                        />
                    )}
                </Container>
            </>
        )
    }
}
