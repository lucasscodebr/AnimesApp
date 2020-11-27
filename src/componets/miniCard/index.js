import React from 'react'
import {Platform} from 'react-native'
import {Container, ImageAnime, ContainerTitle, TitleText, ContainerEpsodio, EpsodioText} from './style'

class MiniCard extends React.PureComponent {
    render(){
        return  <Container onPress={this.props.onPress} key={this.props.id}>
                    <ImageAnime source={ {uri : this.props.img} }>
                    { (this.props.age != undefined) &&             
                        <ContainerEpsodio>
                            <EpsodioText>{(this.props.name.indexOf(' - ') >= 0) && this.props.name.split(' - ')[1].split(' ')[1] }</EpsodioText>
                        </ContainerEpsodio>
                    }
                    </ImageAnime>
                    <ContainerTitle>
                        <TitleText>{ Platform.OS == 'ios' ? this.props.name.split(' - ')[0] : this.props.name.split(' - ')[0].substr(0, 16)  }</TitleText>
                    </ContainerTitle>
                </Container>
    }
}

export default MiniCard;