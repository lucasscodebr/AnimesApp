import styled from 'styled-components/native'
import {Platform} from 'react-native'

export const Container = styled.View`
    background-color : #1a1a1a;
    padding : 10px;
    width : 100%;
    height : auto;
    flexDirection : row;
    borderBottomWidth : 1px;
    borderBottomColor : #000;
`
export const Button = styled.TouchableOpacity`
    width : 30px;
`
export const ContainerChildren = styled.View`
    width : 85%;
    height : 35px;
    border-radius : 5px;
    flexDirection : row;
    marginLeft : 15px;
`

export const TitleText = styled.Text`
    color : #fafafa;
    font-size : 20px;
    fontWeight : bold;
    margin-top : ${Platform.OS == 'ios' ? '8px' : '6px'};
`