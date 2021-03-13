import React from 'react'
import {Alert, ScrollView} from 'react-native'
import ButtonBack from '../../componets/arrowBack'
import { ContainerScroll, ContainerTitle, ContainerTop, ImgBackground, TitleText, ContainerAge, AgeText, ContainerDescription, DescriptionText, ContainerCategory, CategoryBox, CategoryText, ButtonFavorite} from './style'
import server from '../../services/api'
import Epsodio from '../../componets/episodes/index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import url from '../../config/urls'
import err from '../../class/Errors'

class Anime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anime: props.route.params.anime,
            listEp: [],
            colorButtonFavorite: "#fafafa"
        }
    }

    async handleGetEpisodesList(){
        try{
            const response = await server.get(url.EPISODES_URL + this.props.route.params.anime.id + "/list")
            this.setState({...this.state, listEp: response.data})
        }catch(error){
            err.sendPostErrorToApi("handleGetEpisodesList", error) 
        }
    }

    async handleIsFavorite() {
        try{
            const dbString = await AsyncStorage.getItem('@favorite')
            const json = dbString == null ? [] : JSON.parse(dbString)
            const isFavorite = json.find(obj => obj.id == this.state.anime.id)
            if(isFavorite) {
                this.setState({...this.state, colorButtonFavorite: "#ff0"})
            }  
        }catch(error) {
            err.sendPostErrorToApi("handleIsFavorite", error) 
        }
    }

    async handleClickPlayer(episodio) {
        if(episodio.videos.length != 0) {
            this.props.navigation.navigate("Video", { arrayVideos: episodio.videos, episode : { id : episodio.id, title : episodio.title } })
        } else {
            err.sendPostErrorToApi("handleClickPlayer", "Not Found Any Video in the epsode : " + episodio.id)
            Alert.alert("Not Found Any Video, The Admin was contacted!")
        }
    }
   
    async handleClickSaveFavorite() {
        try{
            const storageResult = await AsyncStorage.getItem('@favorite')
            const jsonArray = storageResult == null ? [] : JSON.parse(storageResult)
            const isInDatabase = jsonArray.find(obj => obj.id == this.state.anime.id)    
            if(isInDatabase){
                const listWithRemove = jsonArray.filter(obj => obj.id != this.state.anime.id) 
                await AsyncStorage.setItem('@favorite', JSON.stringify(listWithRemove))
                this.setState({...this.state, colorButtonFavorite: "#fafafa"})
            }else{
                const saveAnime = {...this.state.anime}
                jsonArray.push(saveAnime)
                await AsyncStorage.setItem('@favorite', JSON.stringify(jsonArray))
                this.setState({...this.state, colorButtonFavorite: "#ff0"})                
            }
        }catch(error){
            err.sendPostErrorToApi("handleClickSaveFavorite", error);
        }
    }

    componentDidMount() {
        this.handleGetEpisodesList();
        this.handleIsFavorite();
    }

    render() { 
        Icon.loadFont()
        return  this.state.anime != null && <ContainerScroll>
                                    <ContainerTitle>
                                        <ButtonBack onPress={() => this.props.navigation.goBack()} />
                                        <TitleText>{this.state.anime.name}</TitleText>
                                        <ButtonFavorite onPress={() => this.handleClickSaveFavorite() }>
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
                                    {this.state.listEp.map(episodio => <Epsodio key={`${episodio.id}`}
                                                                    name={episodio.title}
                                                                    image={episodio.image}
                                                                    onPress={() => this.handleClickPlayer(episodio)} />)}
                                </ContainerScroll>
    }
}

export default Anime;