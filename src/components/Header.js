import React from 'react'
import {
    Container,
    Button,
    ContainerChildren,
    TitleText,
} from '../styles/components/Header'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Header = (props) => {
    Icon.loadFont()

    return (
        <Container>
            <Button onPress={() => props.navigation.openDrawer()}>
                <Icon name={'menu'} size={40} color={'#fafafa'} />
            </Button>
            <ContainerChildren>
                {!props.title ? (
                    props.children
                ) : (
                    <TitleText>{props.title}</TitleText>
                )}
            </ContainerChildren>
        </Container>
    )
}

export default Header
