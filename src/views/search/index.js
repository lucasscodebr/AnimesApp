import React, { useEffect, useState } from 'react';
import { View, FlatList} from 'react-native';
import server from '../../services/api';
import Card from '../../componets/card/index'
import Search from '../../componets/search/index';

const Main = (props) => {
    
    const [listAnimes, setListAnimes] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTitle, setSearchTitle] = useState('')

    const dataSend = async (index) => {
        try{
            let response = await server.get(`/odata/Animesdb?$filter=substringof('${searchTitle}', Nome)&$skip=${pageNumber}`)
            let filtro = response.data.value
            let novo = filtro.filter(obj => obj.Nome.indexOf('Dublado') == -1)
            
            if( index == 1 )
                setListAnimes([...listAnimes , ...novo] )
            else
                setListAnimes(novo)
            
            setPageNumber(pageNumber + 50)

        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(() => {
    
        dataSend()

    },[])

    const handleSearch = (text) => {
        setPageNumber(0)
        setSearchTitle(text)
    }

    return  <View style={{height: '100%', backgroundColor : 'rgb(25, 25, 25)'}}>
                <Search {...props} value={searchTitle} onChangeText={txt => handleSearch(txt)} onPress={() => { dataSend(); } } />
                {  listAnimes &&                              
                    <FlatList
                        data={listAnimes}
                        keyExtractor={(item , index) => (`${index+item.Id+pageNumber}`)}
                        renderItem={({item : anime}) => {
                            return <Card    onPress={ () => props.navigation.navigate('Anime', {anime}) } 
                                            id={anime.Id} 
                                            name={anime.Nome} 
                                            img={anime.Imagem} 
                                            category={anime.Categoria} 
                                            description={anime.Desc} 
                                            age={anime.Ano}
                                    />
                        }}

                        onEndReached={() => dataSend(1)}
                        onEndReachedThreshold={0.5}
                    />
                }
            </View>
}

export default Main;