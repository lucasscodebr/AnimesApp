import React from 'react'
import {ScrollView} from 'react-native'
import {
    ContainerScroll,
    ContainerTitle,
    ContainerTop,
    ImgBackground,
    TitleText,
    ContainerAge,
    AgeText,
    ContainerDescription,
    DescriptionText,
    ContainerCategory,
    CategoryBox,
    CategoryText,
    ButtonFavorite,
} from '../styles/views/Animes'
import {Episode, ArrowBack} from '../components'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StorageService from '../services/StorageService'
import AxiosService from '../services/AxiosService'

export default class Anime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anime: props.route.params.anime,
            listEp: [],
            colorButtonFavorite: '#fafafa',
        }
        this.storage = StorageService.getInstance()
        this.http = AxiosService.getInstance()
    }

    async handleGetEpisodesList() {
        try {
            const response = await this.http.findEpisodesByAnimeId(this.state.anime.id)
            this.setState({...this.state, listEp: response})
        } catch (error) {
            this.http.saveError('handleGetEpisodesList', error)
        }
    }

    async handleIsFavorite() {
        try {
            const json = await this.storage.getFavorite()
            const isFavorite = json.find((obj) => obj.id === this.state.anime.id)
            if (isFavorite) {
                this.setState({...this.state, colorButtonFavorite: '#ff0'})
            }
        } catch (error) {
            this.http.saveError('handleIsFavorite', error)
        }
    }

    async handleClickPlayer(episodio) {
        if (episodio.videos.length !== 0) {
            this.props.navigation.navigate('Video', {
                arrayVideos: episodio.videos,
                episode: {id: episodio.id, title: episodio.title},
            })
        } else {
            this.http.saveError('handleClickPlayer', 'Not Found Any Video in the episode : ' + episodio.id)
        }
    }

    async handleClickSaveFavorite() {
        try {
            const json = await this.storage.getFavorite()
            const isInDatabase = json.find((obj) => obj.id === this.state.anime.id)
            if (isInDatabase) {
                const removed = json.filter((obj) => obj.id !== this.state.anime.id)
                this.storage.saveFavorite(removed)
                this.setState({colorButtonFavorite: '#fafafa'})
            } else {
                json.push(this.state.anime)
                this.storage.saveFavorite(json)
                this.setState({colorButtonFavorite: '#ff0'})
            }
        } catch (error) {
            this.http.saveError('handleClickSaveFavorite', error)
        }
    }

    componentDidMount() {
        this.handleGetEpisodesList()
        this.handleIsFavorite()
    }

    render() {
        Icon.loadFont()
        return (
            this.state.anime != null && (
                <ContainerScroll>
                    <ContainerTitle>
                        <ArrowBack onPress={() => this.props.navigation.goBack()} />
                        <TitleText>{this.state.anime.name}</TitleText>
                        <ButtonFavorite onPress={() => this.handleClickSaveFavorite()}>
                            <Icon name={'folder-special'} size={30} color={this.state.colorButtonFavorite} />
                        </ButtonFavorite>
                    </ContainerTitle>
                    <ContainerTop>
                        <ImgBackground source={{uri: this.state.anime.image}}>
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
                        {this.state.anime.category &&
                            this.state.anime.category.map((obj) => (
                                <CategoryBox key={obj.slugify}>
                                    <CategoryText>{obj.name}</CategoryText>
                                </CategoryBox>
                            ))}
                    </ContainerCategory>
                    {this.state.listEp.map((episode) => (
                        <Episode key={episode.id} episode={episode} onPress={() => this.handleClickPlayer(episode)} />
                    ))}
                </ContainerScroll>
            )
        )
    }
}
