import React, { useEffect, useState } from 'react'
import {FlatList, Platform} from 'react-native'
import {Container} from './style'
import RNPickerSelect from 'react-native-picker-select';
import Header from '../../componets/header'
import server from '../../services/api'
import MiniCard from '../../componets/miniCard'
import err from '../../class/Errors'
import url from '../../config/urls'

class AnimeYear extends React.Component {
    constructor(props) {
        super(props)
        this.yearNow = new Date().getFullYear();
        this.state = {
            listAnimes: [],
            pageNumber: 0,
            animeAge: this.yearNow
        }
        this.ageList = Array((this.yearNow + 1) - 1980).fill(this.yearNow).map((year, index) => ({ label: `${year - index}`, value: `${year - index}`, key : year - index }))
    }

    async handleGetByYear(code) {
        try{
            const response = await server.get(url.ANIMES_URL + `find/?year=${this.state.animeAge}&page=${this.state.pageNumber}`)
            if(this.state.listAnimes.length ==  0 || code == true) {
                this.setState({ listAnimes: response.data })
            }else {
                this.setState({ listAnimes: [...this.state.listAnimes, ...response.data] })
            }
            this.setState({ pageNumber: this.state.pageNumber + 50 })      
        }catch(error){
            err.sendPostErrorToApi("handleGetByYear", error)
        }
    }

    handleOnPickerChange(year) {
        this.setState({pageNumber: 0, animeAge: year})
        if(Platform.OS == "android") this.handleGetByYear(true)
    }

    componentDidMount() {
        this.handleGetByYear()
    }

    render() {
        return <>
                <Header {...this.props}>
                    <RNPickerSelect 
                            useNativeAndroidPickerStyle={false}
                            style={{width : '100%' , height : 35}} 
                            doneText={'OK'} 
                            style={{
                                inputIOS: {
                                    fontSize: 18,
                                    color: '#fafafa',
                                    padding : 3,
                                    paddingTop: 10                                                 
                                },  
                                inputAndroid: {
                                    fontSize: 18,
                                    color: '#fafafa',
                                    padding : 3,
                                    paddingTop: 10  
                                }
                            }}
                            placeholder={{
                                label: 'Escolha um ano ...',
                                value: 2020,
                                color: '#000'
                            }}
                            onValueChange={(value) => this.handleOnPickerChange(value)}
                            items={this.ageList}
                            onClose={() => {this.handleGetByYear(true)}}
                        />
                </Header>
                <Container>
                {this.state.listAnimes &&                      
                        <FlatList
                            data={this.state.listAnimes}
                            keyExtractor={(item, index) =>  item + index}
                            renderItem={({item : anime})=> {
                                return <MiniCard anime={anime}
                                            onPress={ () => this.props.navigation.navigate('Anime', {anime}) } 
                                        />
                            }}
                            numColumns={3}
                            onEndReached={() => this.handleGetByYear()}
                            onEndReachedThreshold={0.5}
                        />

                    }
                </Container>                 
            </>   
    }
}

export default AnimeYear