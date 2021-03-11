import React, {Component, useEffect, useState} from 'react'
import { FlatList, Text } from 'react-native'
import { Container } from './style'
import MiniCard from '../../componets/miniCard'
import server from '../../services/api'
import Header from '../../componets/header'
import url from '../../config/urls'

class Recent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listAnimes: []
        }
    }

    async dataSend() {
        try{
            console.log(url)
            const response = await server.get(url.ANIMES_URL)
            console.log(response.data)
            this.setState({listAnimes: response.data})
        }catch(err){
            console.log(err)
        }
    }
    
    componentDidMount() {
        this.dataSend();
    }

    render() {
        return <>
                <Header {...this.props} title={'RECENTES'} ></Header>
                <Container style={{ backgroundColor :'#000', justifyContent : 'space-around'}}> 
                    {this.state.listAnimes &&
                        <FlatList
                            data={this.state.listAnimes}
                            keyExtractor={(item, index) =>  item + index}
                            renderItem={({item : anime})=> {
                                return <MiniCard 
                                            age
                                            id={anime.id} 
                                            name={anime.name} 
                                            img={anime.image}
                                            onPress={ () => this.props.navigation.navigate('Anime', { anime }) } 
                                        />
                            }}
                            numColumns={3}
                        />
                    }
                </Container>
            </>
    }
}

export default Recent;