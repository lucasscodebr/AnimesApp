import React from 'react';
import { View, FlatList} from 'react-native';
import server from '../../services/api';
import Card from '../../componets/card/index'
import Search from '../../componets/search/index';
import url from '../../config/urls'
import err from '../../class/Errors';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.startState = {
            listAnimes: [],
            pageNumber: 0,
            searchTitle: ''
        }
        this.state = {
            ...this.startState
        }
    }

    async handleGetSearchAnimesList() {
        try{
            const response = await server.get(url.ANIMES_URL + `find/?name=${this.state.searchTitle}&page=${this.state.pageNumber}`)
            this.setState({listAnimes: [...this.state.listAnimes, ...response.data]})
            this.setState({pageNumber: this.state.pageNumber + 50})
        }catch(error) {
            err.sendPostErrorToApi("handleGetSearchAnimesList", error)
        }
    }

    handleSearch (text) {
        this.setState({...this.startState, searchTitle: text})
    }

    componentDidMount() {
        this.handleGetSearchAnimesList()
    }

    render() {
        return  <View style={{height: '100%', backgroundColor : 'rgb(25, 25, 25)'}}>
                    <Search {...this.props} value={this.state.searchTitle} onChangeText={txt => this.handleSearch(txt)} onPress={() => { this.handleGetSearchAnimesList() } } />
                    { this.state.listAnimes &&                              
                        <FlatList
                            data={this.state.listAnimes}
                            keyExtractor={(item) => item.id}
                            renderItem={({item : anime}) => {
                                return <Card    onPress={ () => this.props.navigation.navigate('Anime', {anime}) } 
                                                id={anime.id} 
                                                name={anime.name} 
                                                img={anime.image} 
                                                category={anime.category} 
                                                description={anime.sinopse} 
                                                age={anime.age}
                                        />
                            }}

                            onEndReached={() => this.handleGetSearchAnimesList()}
                            onEndReachedThreshold={0.5}
                        />
                    }
                </View>
    }
}

export default Main;