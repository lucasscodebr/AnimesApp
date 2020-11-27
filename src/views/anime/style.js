import { Button } from 'react-native';
import styled from 'styled-components/native';

export const ContainerScroll = styled.ScrollView`
    width : 100%;
    height : 100%;
    background-color : #222;
`
export const ContainerTitle = styled.View`
    height : 65px;
    alignItems : center;  
    backgroundColor : rgb(35,35,35);
    flexDirection : row;
`
export const TitleText = styled.Text`
    fontSize : 18px;
    color : rgb(0 ,255, 48);
    padding : 10px;
    flex : 1;
`
export const ButtonFavorite = styled.TouchableOpacity`
    padding : 10px;
`

export const ContainerTop = styled.View`
    width : 100%;
    height : 225px;
    flexDirection : row;
    backgroundColor : rgb(43, 43, 43);
`
export const ImgBackground = styled.ImageBackground`
    width: 165px;
    height : 225px;
    alignItems : flex-end;
    justifyContent : flex-end;
`
export const ContainerAge = styled.View`
    height: 25px;
    alignItems : center;
    backgroundColor : rgb(27, 27, 27);
    padding : 5px;
`
export const AgeText = styled.Text`
    flex : 1;
    alignItems : center;
    color: #fff;
    fontWeight : bold;
`
export const ContainerDescription = styled.View`
    flex : 1;
    height: auto;
    padding: 10px;
`
export const DescriptionText = styled.Text`
    fontSize : 17px;
    color : #e6ffea;
    textAlign : justify;
`
export const ContainerCategory = styled.View`
    flex : 1;
    height: auto;
    flexDirection : row;
    justifyContent : center;
    alignItems : center;
    padding : 10px;
    backgroundColor : rgb(51, 51, 51);
    borderBottomWidth : 1px;
    borderBottomColor : #000;
`
export const CategoryBox = styled.View`
    padding : 4px;
`
export const CategoryText = styled.Text`
    fontSize : 12px;
    color : #1aff44;
`
