import styled from 'styled-components/native'

export const ContainerScroll = styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: #222;
`
export const ContainerTitle = styled.View`
    height: 65px;
    align-items: center;
    background-color: rgb(35, 35, 35);
    flex-direction: row;
`
export const TitleText = styled.Text`
    font-size: 18px;
    color: rgb(0, 255, 48);
    padding: 10px;
    flex: 1;
`
export const ButtonFavorite = styled.TouchableOpacity`
    padding: 10px;
`

export const ContainerTop = styled.View`
    width: 100%;
    height: 225px;
    flex-direction: row;
    background-color: rgb(43, 43, 43);
`
export const ImgBackground = styled.ImageBackground`
    width: 165px;
    height: 225px;
    align-items: flex-end;
    justify-content: flex-end;
`
export const ContainerAge = styled.View`
    height: 25px;
    align-items: center;
    background-color: rgb(27, 27, 27);
    padding: 5px;
`
export const AgeText = styled.Text`
    flex: 1;
    align-items: center;
    color: #fff;
    font-weight: bold;
`
export const ContainerDescription = styled.View`
    flex: 1;
    height: auto;
    padding: 10px;
`
export const DescriptionText = styled.Text`
    font-size: 17px;
    color: #e6ffea;
    text-align: justify;
`
export const ContainerCategory = styled.View`
    flex: 1;
    height: auto;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: rgb(51, 51, 51);
    border-bottom-width: 1px;
    border-bottom-color: #000;
`
export const CategoryBox = styled.View`
    padding: 4px;
`
export const CategoryText = styled.Text`
    font-size: 12px;
    color: #1aff44;
`
