import styled from 'styled-components/native'

export const ContainerScroll = styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: #222;
`
export const ContainerTitle = styled.View`
    height: 65px;
    alignitems: center;
    backgroundcolor: rgb(35, 35, 35);
    flexdirection: row;
`
export const TitleText = styled.Text`
    fontsize: 18px;
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
    flexdirection: row;
    backgroundcolor: rgb(43, 43, 43);
`
export const ImgBackground = styled.ImageBackground`
    width: 165px;
    height: 225px;
    alignitems: flex-end;
    justifycontent: flex-end;
`
export const ContainerAge = styled.View`
    height: 25px;
    alignitems: center;
    backgroundcolor: rgb(27, 27, 27);
    padding: 5px;
`
export const AgeText = styled.Text`
    flex: 1;
    alignitems: center;
    color: #fff;
    fontweight: bold;
`
export const ContainerDescription = styled.View`
    flex: 1;
    height: auto;
    padding: 10px;
`
export const DescriptionText = styled.Text`
    fontsize: 17px;
    color: #e6ffea;
    textalign: justify;
`
export const ContainerCategory = styled.View`
    flex: 1;
    height: auto;
    flexdirection: row;
    justifycontent: center;
    alignitems: center;
    padding: 10px;
    backgroundcolor: rgb(51, 51, 51);
    borderbottomwidth: 1px;
    borderbottomcolor: #000;
`
export const CategoryBox = styled.View`
    padding: 4px;
`
export const CategoryText = styled.Text`
    fontsize: 12px;
    color: #1aff44;
`
