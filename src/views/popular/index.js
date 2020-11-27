import React, {useEffect, useState} from 'react'
import { FlatList } from 'react-native'
import { Container } from './style'
import MiniCard from '../../componets/miniCard'
import server from '../../services/api'
import Header from '../../componets/header'

const Popular = props => {

    const [listAnimes, setListAnimes] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const dataSend = async () =>{
        try{

            console.log(pageNumber)
            let response = await server.get(`/odata/Animesdb?$select=Id,Nome,Imagem,Rank&$orderby=Rank desc&$skip=${pageNumber}&$inlinecount=allpages`)
            let filtro = response.data.value
            let novo = filtro.filter(obj => obj.Nome.indexOf('Dublado') == -1)

            if(listAnimes.length ==  0)
                setListAnimes( novo )
            else 
                setListAnimes([...listAnimes , ...novo] )
                        
            setPageNumber(pageNumber + 50)
            
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        dataSend()
    } ,[])

    return <>
                <Header {...props} title={'POPULAR'}></Header>
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
                                            age={anime.Ano}
                                            onPress={ () => props.navigation.navigate('Anime', { anime }) } 
                                        />
                            }}
                            numColumns={3}
                            onEndReached={() => dataSend()}
                            onEndReachedThreshold={0.5}
                        />

                    }
            </Container>
           </>
}

export default Popular;