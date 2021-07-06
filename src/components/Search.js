import React from 'react'
import {ContainerInput, Input, Button} from '../styles/components/Search'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Header} from '../components'

const Search = (props) => {
    Icon.loadFont()

    return (
        <Header {...props}>
            <ContainerInput>
                <Input
                    placeholder={'Pesquisa por nome '}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    placeholderTextColor={'#ccffd5'}
                    onPress={() => props.onPress()}
                    onKeyPress={({nativeEvent: {key}}) => {
                        if (key == ' ') props.onPress()
                    }}
                />
                <Button onPress={() => props.onPress()}>
                    <Icon name={'search'} size={30} color={'#fafafa'} />
                </Button>
            </ContainerInput>
        </Header>
    )
}

export default Search
