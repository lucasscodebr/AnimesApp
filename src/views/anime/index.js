import React,{useState, useEffect} from 'react'
import {ScrollView} from 'react-native'
import ButtonBack from '../../componets/arrowBack'
import { ContainerScroll, ContainerTitle, ContainerTop, ImgBackground, TitleText, ContainerAge, AgeText, ContainerDescription, DescriptionText, ContainerCategory, CategoryBox, CategoryText, ButtonFavorite} from './style'
import server from '../../services/api'
import Epsodio from '../../componets/episodes/index'
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'

class Anime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anime: this.props.route.params.anime,
            listEp: [],
            colorButtonFavorite: "#fafafa"
        }
    }

    async dataSend(operation, id) {
        try{
            switch(operation){
                case 1 : {
                    let response = await server.get(`/api/episodioexes/${animeId}`)
                    let list = response.data.map(obj => handleObjectListEp(obj));
                    this.setState({...this.state, listEp: list})
                }
                break;
                case 2 : {
                    await server.get(`/api/episodioexes/links?id=${id}`).then(response => {
                        props.navigation.navigate('Video', {urlVideo : response.data[0].Endereco})
                    })
                }
                break;
                default : {
                    if(anime.Desc == null || anime.Desc == ""){
                        let response = await server.get(`/odata/Animesdb?$filter=Id eq ${animeId}`)
                        setAnime(response.data.value[0])
                    }
                }
            }

            const dbString = await AsyncStorage.getItem('@favorito')
            const json = dbString == null ? [] : JSON.parse(dbString)
            const isFavorite = json.find(obj => obj.Id == animeId)
            if(isFavorite)
                setColorButtonFavorite('#ff0')


        }catch(err) {
            console.log('Error : ' + err)
        }
    }
    handleObjectListEp(obj) {
        return {...obj, Image : `http://thumb.zetai.info/${obj.Id}.jpg`}
    }

    handleClickPlayer(videoId) {
        dataSend(2, videoId)
    }
   
    async handleClickSave() {
        const databaseString = await AsyncStorage.getItem('@favorito')
        const jsonArray = databaseString == null ? [] : JSON.parse(databaseString)
        const isInDatabase = jsonArray.find(obj => obj.Id == anime.Id)    
        if(isInDatabase){
            const listWithRemove = jsonArray.filter(obj => obj.Id != anime.Id) 
            await AsyncStorage.setItem('@favorito', JSON.stringify(listWithRemove))
            setColorButtonFavorite('#fafafa')
        }else{
            const saveAnime = { 
                                Id : anime.Id, 
                                Nome: anime.Nome, 
                                Imagem : anime.Imagem, 
                                Ano : anime.Ano,
                                Desc : anime.Desc,
                                Categoria : anime.Categoria 
                            }
            jsonArray.push(saveAnime)
            await AsyncStorage.setItem('@favorito', JSON.stringify(jsonArray))
            setColorButtonFavorite('#ff0')                
        }
    }

    componentDidMount() {
        this.dataSend()
        this.dataSend(1)
    }

    render() { 
        Icon.loadFont()

        return  anime != null && <ContainerScroll>
                                    <ContainerTitle>
                                        <ButtonBack onPress={() => props.navigation.goBack()} />
                                        <TitleText>{anime.Nome}</TitleText>
                                        <ButtonFavorite onPress={() => handleClickSave() }>
                                            <Icon name={'folder-special'} size={30} color={colorButtonFavorite} />
                                        </ButtonFavorite>
                                    </ContainerTitle>
                                    <ContainerTop>
                                        <ImgBackground source={ {uri : anime.Imagem} }>
                                            <ContainerAge>
                                                <AgeText>{anime.Ano}</AgeText>
                                            </ContainerAge>
                                        </ImgBackground>
                                        <ContainerDescription>
                                            <ScrollView>
                                                <DescriptionText>{anime.Desc}</DescriptionText>
                                            </ScrollView>
                                        </ContainerDescription>
                                    </ContainerTop>

                                    <ContainerCategory>
                                        { anime.Categoria && anime.Categoria.split(',').map(txt => <CategoryBox key={txt}>
                                                                                                        <CategoryText>{txt}</CategoryText> 
                                                                                                    </CategoryBox> )
                                        }
                                    </ContainerCategory>
                                    
                                    {listEp.map(epsodio => <Epsodio key={`${epsodio.Id}`}
                                                                    name={epsodio.Nome}
                                                                    image={epsodio.Image}
                                                                    onPress={() => handleClickPlayer(epsodio.Id)} />)}
                                </ContainerScroll>
    }
}

// const Anime = (props) => {
    
//     const { Id : animeId } = props.route.params.anime

//     const [anime, setAnime] = useState(props.route.params.anime);
//     const [listEp, setListEp] = useState([]);
//     const [colorButtonFavorite, setColorButtonFavorite] = useState('#fafafa')

//     const handleObjectListEp = (obj) => {
//         return {...obj, Image : `http://thumb.zetai.info/${obj.Id}.jpg`}
//     }

//     const dataSend = async (operation, id) => {
//         try{
//             switch(operation){
//                 case 1 : {
//                     let response = await server.get(`/api/episodioexes/${animeId}`)
//                     let list = response.data.map(obj => handleObjectListEp(obj));
//                     setListEp(list)
//                 }
//                 break;
//                 case 2 : {
//                     await server.get(`/api/episodioexes/links?id=${id}`).then(response => {
//                         props.navigation.navigate('Video', {urlVideo : response.data[0].Endereco})
//                     })
//                 }
//                 break;
//                 default : {
//                     if(anime.Desc == null || anime.Desc == ""){
//                         let response = await server.get(`/odata/Animesdb?$filter=Id eq ${animeId}`)
//                         setAnime(response.data.value[0])
//                     }
//                 }
//             }

//             const dbString = await AsyncStorage.getItem('@favorito')
//             const json = dbString == null ? [] : JSON.parse(dbString)
//             const isFavorite = json.find(obj => obj.Id == animeId)
//             if(isFavorite)
//                 setColorButtonFavorite('#ff0')


//         }catch(err) {
//             console.log('Error : ' + err)
//         }
//     }

//     useEffect(() => {

//         dataSend()
//         dataSend(1)

//     },[])

//     const handleClickPlayer = (videoId) =>{
//         dataSend(2, videoId)
//     }
   
//     const handleClickSave = async () => {

//         const databaseString = await AsyncStorage.getItem('@favorito')

//         const jsonArray = databaseString == null ? [] : JSON.parse(databaseString)

//         const isInDatabase = jsonArray.find(obj => obj.Id == anime.Id)
        
//         if(isInDatabase){

//             const listWithRemove = jsonArray.filter(obj => obj.Id != anime.Id) 
//             await AsyncStorage.setItem('@favorito', JSON.stringify(listWithRemove))
//             setColorButtonFavorite('#fafafa')
//         }else{

//             const saveAnime = { 
//                                 Id : anime.Id, 
//                                 Nome: anime.Nome, 
//                                 Imagem : anime.Imagem, 
//                                 Ano : anime.Ano,
//                                 Desc : anime.Desc,
//                                 Categoria : anime.Categoria 
//                             }
            
//             jsonArray.push(saveAnime)

//             await AsyncStorage.setItem('@favorito', JSON.stringify(jsonArray))
//             setColorButtonFavorite('#ff0')                
//         }


//     }

//     Icon.loadFont()

//     return  anime != null && <ContainerScroll>
//                                 <ContainerTitle>
//                                     <ButtonBack onPress={() => props.navigation.goBack()} />
//                                     <TitleText>{anime.Nome}</TitleText>
//                                     <ButtonFavorite onPress={() => handleClickSave() }>
//                                         <Icon name={'folder-special'} size={30} color={colorButtonFavorite} />
//                                     </ButtonFavorite>
//                                 </ContainerTitle>
//                                 <ContainerTop>
//                                     <ImgBackground source={ {uri : anime.Imagem} }>
//                                         <ContainerAge>
//                                             <AgeText>{anime.Ano}</AgeText>
//                                         </ContainerAge>
//                                     </ImgBackground>
//                                     <ContainerDescription>
//                                         <ScrollView>
//                                             <DescriptionText>{anime.Desc}</DescriptionText>
//                                         </ScrollView>
//                                     </ContainerDescription>
//                                 </ContainerTop>

//                                 <ContainerCategory>
//                                     { anime.Categoria && anime.Categoria.split(',').map(txt => <CategoryBox key={txt}>
//                                                                                                     <CategoryText>{txt}</CategoryText> 
//                                                                                                 </CategoryBox> )
//                                     }
//                                 </ContainerCategory>
                                
//                                 {listEp.map(epsodio => <Epsodio key={`${epsodio.Id}`}
//                                                                 name={epsodio.Nome}
//                                                                 image={epsodio.Image}
//                                                                 onPress={() => handleClickPlayer(epsodio.Id)} />)}
//                             </ContainerScroll>
// }

export default Anime;