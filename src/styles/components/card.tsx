import styled from 'styled-components/native'

export const CardContainer = styled.TouchableOpacity`
    flex-direction: row;
    background-color: rgb(34, 34, 34);
    margin: 5px;
    border: 1px solid #000;
    border-radius: 5px;
`
export const InfoContainer = styled.View`
    flex: 1;
    padding: 5px;
`
export const ContainerLeft = styled.View`
    width: 110px;
    height: 176px;
`
export const Line = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: #262626;
    height: 30px;
`
export const Line2 = styled.View`
    padding-top: 3px;
    border-bottom-width: 1px;
    border-bottom-color: #e6e6e6;
    height: 30px;
`
export const Line3 = styled.ScrollView`
    height: 105px;
`

export const ContainerAno = styled.View`
    flex: 1;
    align-items: center;
    background-color: rgb(43, 43, 43);
    padding: 5px;
`
export const AnoText = styled.Text`
    flex: 1;
    align-items: center;
    color: #fafafa;
`
export const ImageAnime = styled.Image`
    width: 110px;
    height: 150px;
`
export const TitleText = styled.Text`
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    padding: 5px;
    color: rgb(0, 255, 48);
`
export const CategoryText = styled.Text`
    flex: 1;
    font-size: 13px;
    padding: 5px;
    color: #f2f2f2;
`
export const DescritionText = styled.Text`
    flex: 1;
    font-size: 12px;
    padding: 5px;
    color: rgb(153, 153, 153);
`
