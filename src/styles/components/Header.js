import styled from 'styled-components/native'
import {Platform} from 'react-native'

export const Container = styled.View`
    background-color: #1a1a1a;
    padding: 10px;
    width: 100%;
    height: auto;
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: #000;
`
export const Button = styled.TouchableOpacity`
    width: 30px;
`
export const ContainerChildren = styled.View`
    width: 85%;
    height: 35px;
    border-radius: 5px;
    flex-direction: row;
    margin-left: 15px;
`

export const TitleText = styled.Text`
    color: #fafafa;
    font-size: 20px;
    font-weight: bold;
    margin-top: ${Platform.OS === 'ios' ? '8px' : '6px'};
`
