import React from 'react'
import {View} from 'react-native'
import {CardContainer, InfoContainer, Line, Line2, Line3, ContainerAno, AnoText, ImageAnime, TitleText, CategoryText, DescritionText, ContainerLeft} from './style'

class Card extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    render(){
        return <CardContainer key={this.props.id} onPress={this.props.onPress}>
                    <ContainerLeft>
                        <ImageAnime source={ {uri : this.props.img} }/>
                        <ContainerAno>
                            <AnoText>{this.props.age}</AnoText>
                        </ContainerAno>
                    </ContainerLeft>
                        <InfoContainer>
                            <Line>
                                <TitleText>{this.props.name}</TitleText>
                            </Line>
                            <Line2>         
                                <CategoryText>{this.props.category.map(obj => obj.name)}</CategoryText>
                            </Line2>
                            <Line3>
                                <DescritionText>{this.props.description}</DescritionText>
                            </Line3>
                        </InfoContainer>
                </CardContainer>
    }
}

export default Card;