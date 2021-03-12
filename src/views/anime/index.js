import React from 'react'
import {ScrollView} from 'react-native'
import ButtonBack from '../../componets/arrowBack'
import { ContainerScroll, ContainerTitle, ContainerTop, ImgBackground, TitleText, ContainerAge, AgeText, ContainerDescription, DescriptionText, ContainerCategory, CategoryBox, CategoryText, ButtonFavorite} from './style'
import server from '../../services/api'
import Epsodio from '../../componets/episodes/index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import url from '../../config/urls'

class Anime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anime: props.route.params.anime,
            listEp: [],
            colorButtonFavorite: "#fafafa"
        }
    }

    async dataSend(operation, id) {
        try{
            switch(operation){
                case 1 : {
                    const urlRequest = url.EPISODES_URL + "/list/"+ this.props.route.params.anime.id
                    console.log(urlRequest)
                    let response = await server.get(urlRequest)
                    const list = response.data;
                    console.log(list)
                    this.setState({...this.state, listEp: list})
                }
                break;
                case 2 : {
                    await server.get(`/api/episodioexes/links?id=${id}`).then(response => {
                        this.props.navigation.navigate('Video', {urlVideo : response.data[0].Endereco})
                    })
                }
                break;
                default : {
                    if(anime.Desc == null || anime.Desc == ""){
                        let response = await server.get(`/odata/Animesdb?$filter=Id eq ${animeId}`)
                        this.setState({...this.state, anime: response.data.value[0]})
                    }
                }
            }

            const dbString = await AsyncStorage.getItem('@favorito')
            const json = dbString == null ? [] : JSON.parse(dbString)
            const isFavorite = json.find(obj => obj.Id == animeId)
            if(isFavorite) {
                this.setState({...this.state, colorButtonFavorite: "#ff0"})
            }
        }catch(err) {
            console.log('Error : ' + err)
        }
    }

    handleClickPlayer(videoId) {
        this.dataSend(2, videoId)
    }
   
    async handleClickSave() {
        const databaseString = await AsyncStorage.getItem('@favorito')
        const jsonArray = databaseString == null ? [] : JSON.parse(databaseString)
        const isInDatabase = jsonArray.find(obj => obj.Id == anime.Id)    
        if(isInDatabase){
            const listWithRemove = jsonArray.filter(obj => obj.Id != anime.Id) 
            await AsyncStorage.setItem('@favorito', JSON.stringify(listWithRemove))
            this.setState({...this.state, colorButtonFavorite: "#fafafa"})
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
            this.setState({...this.state, colorButtonFavorite: "#ff0"})                
        }
    }

    componentDidMount() {
        this.dataSend()
        this.dataSend(1)
    }

    render() { 
        Icon.loadFont()

        return  this.state.anime != null && <ContainerScroll>
                                    <ContainerTitle>
                                        <ButtonBack onPress={() => this.props.navigation.goBack()} />
                                        <TitleText>{this.state.anime.name}</TitleText>
                                        <ButtonFavorite onPress={() => this.handleClickSave() }>
                                            <Icon name={'folder-special'} size={30} color={this.state.colorButtonFavorite} />
                                        </ButtonFavorite>
                                    </ContainerTitle>
                                    <ContainerTop>
                                        <ImgBackground source={ {uri : this.state.anime.image} }>
                                            <ContainerAge>
                                                <AgeText>{this.state.anime.age}</AgeText>
                                            </ContainerAge>
                                        </ImgBackground>
                                        <ContainerDescription>
                                            <ScrollView>
                                                <DescriptionText>{this.state.anime.sinopse}</DescriptionText>
                                            </ScrollView>
                                        </ContainerDescription>
                                    </ContainerTop>

                                    <ContainerCategory>
                                        { this.state.anime.category && this.state.anime.category.map(obj =>
                                            <CategoryBox key={obj.slugify}>
                                                <CategoryText>{obj.name}</CategoryText> 
                                            </CategoryBox>)
                                        }
                                    </ContainerCategory>
                                    
                                    {this.state.listEp.map(epsodio => <Epsodio key={`${epsodio.Id}`}
                                                                    name={epsodio.Nome}
                                                                    image={epsodio.Image}
                                                                    onPress={() => handleClickPlayer(epsodio.Id)} />)}
                                </ContainerScroll>
    }
}

export default Anime;