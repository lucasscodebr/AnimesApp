import React, {useEffect, useState} from 'react'
import { FlatList, Text } from 'react-native'
import { Container } from './style'
import MiniCard from '../../componets/miniCard'
import server from '../../services/api'
import Header from '../../componets/header'

const Recent = props => {

    const [listAnimes, setListAnimes] = useState([]);

    const dataSend = async () =>{
        try{
        
            let response = await server.get(`/api/animes/recentes`)
            let filtro = response.data
            let novo = filtro.filter(obj => obj.Nome.indexOf('Dublado') == -1)
            setListAnimes(novo)
            
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        dataSend()  
    } ,[])

    return <>
                <Header {...props} title={'RECENTES'} ></Header>
                <Container style={{ backgroundColor :'#000', justifyContent : 'space-around'}}>
                    
                    {listAnimes &&
                    
                        <FlatList
                            data={listAnimes}
                            keyExtractor={(item, index) =>  item + index}
                            
                            renderItem={({item : anime})=> {
                                return <MiniCard 
                                            age
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

export default Recent;