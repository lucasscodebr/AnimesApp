import React from 'react'
import {CardContainer, InfoContainer, Line, Line2, Line3, ContainerAno, AnoText, ImageAnime, TitleText, CategoryText, DescritionText, ContainerLeft} from '../styles/components/card'

export class Card extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <CardContainer key={this.props.anime.id} onPress={this.props.onPress}>
                <ContainerLeft>
                    <ImageAnime source={{uri: this.props.anime.image}} />
                    <ContainerAno>
                        <AnoText>{this.props.anime.age}</AnoText>
                    </ContainerAno>
                </ContainerLeft>
                <InfoContainer>
                    <Line>
                        <TitleText>{this.props.anime.name}</TitleText>
                    </Line>
                    <Line2>
                        <CategoryText>{this.props.anime.category.map((obj) => obj.name + ' ')}</CategoryText>
                    </Line2>
                    <Line3>
                        <DescritionText>{this.props.anime.sinopse}</DescritionText>
                    </Line3>
                </InfoContainer>
            </CardContainer>
        )
    }
}
