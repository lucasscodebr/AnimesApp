import React from 'react'
import {ScrollView} from 'react-native'
import {ContainerScroll, ContainerTitle, ContainerTop, ImgBackground, TitleText, ContainerAge, AgeText, ContainerDescription, DescriptionText, ContainerCategory, CategoryBox, CategoryText, ButtonFavorite} from '../styles/views/Animes'
import {Episode, ArrowBack} from '../components'
import Icon from 'react-native-vector-icons/MaterialIcons'
import StorageService from '../services/StorageService'
import AxiosService from '../services/AxiosService'

export default class Anime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {anime: props.route.params.anime, episodes: [], color: '#fafafa'}
        this.storage = StorageService.getInstance()
        this.http = AxiosService.getInstance()
    }

    async handleGetEpisodesList() {
        try {
            const response = await this.http.findEpisodesByAnimeId(this.state.anime.id)
            const exists = await this.storage.findFavoriteByAnimeId(this.state.anime.id)
            this.setState({episodes: response, color: exists ? '#ff0' : this.state.color})
        } catch (error) {
            this.http.saveError('handleGetEpisodesList', error)
        }
    }

    async handleClickPlayer(episodio) {
        if (episodio.videos.length !== 0) {
            this.props.navigation.navigate('Video', {
                arrayVideos: episodio.videos,
                episode: {id: episodio.id, title: episodio.title},
            })
        }
    }

    async handleClickSaveFavorite() {
        try {
            const exists = await this.storage.findFavoriteByAnimeId(this.state.anime.id)
            if (exists) {
                this.storage.deleteFavorite(this.state.anime.id)
                this.setState({color: '#fafafa'})
            } else {
                this.storage.saveOneFavorite(this.state.anime)
                this.setState({color: '#ff0'})
            }
        } catch (error) {
            this.http.saveError('handleClickSaveFavorite', error)
        }
    }

    componentDidMount() {
        this.handleGetEpisodesList()
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
                            <Icon name={'folder-special'} size={30} color={this.state.color} />
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
                    {this.state.episodes.map((episode) => (
                        <Episode key={episode.id} episode={episode} onPress={() => this.handleClickPlayer(episode)} />
                    ))}
                </ContainerScroll>
            )
        )
    }
}
