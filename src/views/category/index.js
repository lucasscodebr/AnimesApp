import React, { useEffect, useState } from 'react'
import {FlatList, Platform} from 'react-native'
import Header from '../../componets/header'
import { Container } from './style'
import RNPickerSelect from 'react-native-picker-select';
import server from '../../services/api'
import MiniCard from '../../componets/miniCard'

const Category = (props) => {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Romance');
    const [pageNumber, setPageNumber] = useState(0)
    const [listAnimes, setListAnime] = useState([])

    const dataSend = async (index) => {
        try{
            if(index == 1){

                let response = await server.get('/api/categoria')
                setCategoryList(response.data.filter(obj => obj.Nome != 'Dublado').map(obj => { return {label : obj.Nome, key : obj.Id, value : obj.Nome} }))

            }else{
                
                let response = await server.get(`/odata/Animesdb?$filter=substringof('${selectedCategory}',Categoria)&$select=Id,Nome,Imagem,Ano&$orderby=Nome&$skip=${pageNumber}&$inlinecount=allpages`)
                let filtro = response.data.value
                let novo = filtro.filter(obj => obj.Nome.indexOf('Dublado') == -1)

                if(index == 2)
                    setListAnime([...listAnimes, ...novo])
                else
                    setListAnime(novo)

                setPageNumber(pageNumber + 50)
            }

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        dataSend(1)
        dataSend()
    },[])

    const handlePickerChange = (category) =>{
        setPageNumber(0)
        setSelectedCategory(category)

        if(Platform.OS =='android')
            dataSend()
    }

    return <>
            { !categoryList.length > 0 ? <Header {...props} title={'CATEGORIA'}></Header> :
                <Header {...props} >                                 
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
                                label: 'Escolha a Categoria ...',
                                value: 'Romance',
                                color: '#000'
                            }}
                            onValueChange={(value) => handlePickerChange(value)}
                            items={categoryList}
                            onClose={() => dataSend()}
                        />
               </Header>}
            <Container >
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
                                            onPress={ () => props.navigation.navigate('Anime', { anime }) } 
                                        />
                            }}
                            numColumns={3}
                            onEndReached={() => dataSend(2)}
                            onEndReachedThreshold={0.5}
                        />

                    }
            </Container>
           </>
}

export default Category