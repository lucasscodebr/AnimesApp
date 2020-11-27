import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Container, ButtonBack, TitleButtonBack} from './style'

const ArrowBack = (props) => {

    Icon.loadFont();

    return <Container>
                <ButtonBack onPress={props.onPress}>
                    <Icon name={'arrow-back-ios'} size={30} color={'#fafafa'} />
                </ButtonBack>
           </Container>
}

export default ArrowBack;