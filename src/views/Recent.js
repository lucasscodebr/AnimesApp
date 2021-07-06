import React from 'react'
import {FlatList} from 'react-native'
import {Container} from '../styles/views/Recent'
import {Header, MiniCard} from '../components'
import AxiosServices from '../services/AxiosService'

export default class Recent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listAnimes: [],
        }
        this.http = AxiosServices.getInstance()
    }

    async handleGetRecentAnimes() {
        try {
            const result = this.http.findAnimesRecents()
            this.setState({listAnimes: result})
        } catch (error) {
            this.http.saveError('handleGetRecentAnimes', error)
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
