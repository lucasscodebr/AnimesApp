import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import Header from '../../componets/header'
import {Container} from './style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MiniCard from '../../componets/miniCard'
import { useIsFocused } from '@react-navigation/native'

const Favorites = props => {

    const [listAnimes, setListAnimes] = useState([]);
    const reloads = useIsFocused();

    const dataSend = async() => {
        try{
            let jsonResponse = await AsyncStorage.getItem('@favorito')
            let response = jsonResponse == null ? [] : JSON.parse(jsonResponse)

            setListAnimes(response)

        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {

        dataSend()

    },[reloads])

    return <>
            <Header {...props} title={'MINHA LISTA'} />
            <Container>
            {listAnimes &&
                    
                    <FlatList
                        data={listAnimes}
                        keyExtractor={(item, index) =>  item + index}
                        
                        renderItem={({item : anime})=> {
                            return <MiniCard 
                                        id={anime.Id} 
                                        name={anime.Nome} 
                                        img={anime.Imagem}
                                        onPress={ () => props.navigation.navigate('Anime', { anime }) } 
                                    />
                        }}
                        numColumns={3}
                    />
            }
            </Container>
           </>
}

export default Favorites;