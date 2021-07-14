import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Container, ButtonBack} from '../styles/components/arrow-back'

export const ArrowBack = (props) => {
    Icon.loadFont()

    return (
        <Container>
            <ButtonBack onPress={props.onPress}>
                <Icon name={'arrow-back-ios'} size={30} color={'#fafafa'} />
            </ButtonBack>
        </Container>
    )
}
