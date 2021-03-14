import React from 'react'
import { FlatList } from 'react-native'
import Header from '../../componets/header'
import {Container} from './style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MiniCard from '../../componets/miniCard'
import err from '../../class/Errors'

class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listAnimes: []
        }
    }

    async handleGetAnimesOnStorage() {
        try {
            const jsonResponse = await AsyncStorage.getItem("@favorite");
            const response = jsonResponse == null ? [] : JSON.parse(jsonResponse);
            this.setState({listAnimes: response})
        }catch(error) {
            err.sendPostErrorToApi("handleGetAnimesOnStorage", error, "GET STORAGE ERROR")
        }
    }

    componentDidMount() {
        this.handleGetAnimesOnStorage()
    }

    render(){
        return <>
            <Header {...this.props} title={'MINHA LISTA'} />
            <Container>
            {this.state.listAnimes && 
                    <FlatList
                        data={this.state.listAnimes}
                        keyExtractor={(item, index) =>  item + index}    
                        renderItem={({item : anime})=> {
                            return <MiniCard 
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

export default Favorites;