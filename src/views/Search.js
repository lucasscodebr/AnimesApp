import React from 'react'
import {StyleSheet} from 'react-native'
import {View, FlatList} from 'react-native'
import {Card, Search} from '../components'
import AxiosService from '../services/AxiosService'

export default class SearchView extends React.Component {
    constructor(props) {
        super(props)
        this.style = StyleSheet.create({back: {height: '100%', backgroundColor: 'rgb(25, 25, 25)'}})
        this.start = {list: [], page: 0, title: ''}
        this.state = {...this.start}
        this.http = AxiosService.getInstance()
    }

    async handleGetSearchAnimesList() {
        try {
            const response = await this.http.findAllAnimes(this.state.page)
            this.setState({
                list: [...this.state.list, ...response],
            })
            this.setState({page: this.state.page + 50})
        } catch (error) {
            await this.http.saveError('handleGetSearchAnimesList', error)
        }
    }

    handleSearch(text) {
        console.log(text)
        this.setState({...this.start, title: text})
    }

    componentDidMount() {
        this.handleGetSearchAnimesList()
    }

    render() {
        return (
            <View style={this.style.back}>
                <Search {...this.props} value={this.state.title} onChangeText={this.handleSearch.bind(this)} onPress={this.handleGetSearchAnimesList.bind(this)} />
                {this.state.list && (
                    <FlatList
                        data={this.state.list}
                        keyExtractor={(item) => item.id}
                        renderItem={({item: anime}) => {
                            return <Card anime={anime} onPress={() => this.props.navigation.navigate('Anime', {anime})} />
                        }}
                        onEndReached={this.handleGetSearchAnimesList.bind(this)}
                        onEndReachedThreshold={0.5}
                    />
                )}
            </View>
        )
    }
}