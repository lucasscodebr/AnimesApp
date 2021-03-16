import React from 'react'
import {Platform} from 'react-native'
import {Container, ImageAnime, ContainerTitle, TitleText, ContainerEpsodio, EpsodioText} from './style'

class MiniCard extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render(){
        return  <Container onPress={this.props.onPress} key={this.props.anime.id}>
                    <ImageAnime source={ {uri : this.props.anime.image} }>
                    { (this.props.anime.age != undefined) &&             
                        <ContainerEpsodio>
                            <EpsodioText>{this.props.anime.name}</EpsodioText>
                        </ContainerEpsodio>
                    }
                    </ImageAnime>
                    <ContainerTitle>
                        <TitleText>{ Platform.OS == 'ios' ? this.props.anime.name : this.props.anime.name.substr(0, 16) }</TitleText>
                    </ContainerTitle>
                </Container>
    }
}

export default MiniCard;