import React, { useEffect, useState } from 'react'
import {FlatList, Platform} from 'react-native'
import {Container} from './style'
import RNPickerSelect from 'react-native-picker-select';
import Header from '../../componets/header'
import server from '../../services/api'
import MiniCard from '../../componets/miniCard'

const ForAge = props => {

    const AGE_NOW = new Date().getFullYear()

    const [listAnimes, setListAnimes] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [animeAge, setAnimeAge] = useState(AGE_NOW);

    const ageList = [];
  
    for(let age = AGE_NOW; age > 1980 ; age-- ){
        ageList.push({ label: `${age}`, value: `${age}`, key : age })
    }

    const dataSend = async (index) =>{
        try{
            let response = await server.get(`/odata/Animesdb?$filter=substringof('${animeAge}',Ano)&$select=Id,Nome,Imagem,Ano&$orderby=Nome&$skip=${pageNumber}`);
            let filtro = response.data.value
            let novo = filtro.filter(obj => obj.Nome.indexOf('Dublado') == -1)

            if(listAnimes.length ==  0 || index == 1){

                setListAnimes( novo )
            }   
            else {
                setListAnimes([...listAnimes , ...novo] )
            }
                           
            setPageNumber(pageNumber + 50)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        dataSend()
    },[])
    
    const handleOnPickerChange = (age) =>{
        setPageNumber(0)
        setAnimeAge(age)
        
        if(Platform.OS == "android")
            dataSend(1)

    }

    return <>
               <Header {...props}>
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
                            onValueChange={(value) => handleOnPickerChange(value)}
                            items={ageList}
                            onClose={() => {dataSend(1)}}
                        />
               </Header>
               <Container>
                {listAnimes &&                      
                        <FlatList
                            data={listAnimes}
                            keyExtractor={(item, index) =>  item + index}
                            
                            renderItem={({item : anime})=> {
                                return <MiniCard 
                                            render
                                            id={anime.Id} 
                                            name={anime.Nome} 
                                            img={anime.Imagem}
                                            onPress={ () => props.navigation.navigate('Anime', {anime}) } 
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

export default ForAge