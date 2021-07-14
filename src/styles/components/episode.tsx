import styled from 'styled-components/native'

export const ContainerEpisode = styled.TouchableOpacity`
    flex: 1;
    height: auto;
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: #000;
    background-color: rgb(33, 33, 33);
`
export const ImgEpisode = styled.Image`
    width: 120px;
    height: 80px;
    margin-right: 10px;
`
export const ContainerText = styled.View`
    justify-content: center;
    width: 65%;
`
export const DescriptionText = styled.Text`
    color: #33ff58;
    text-align: justify;
`
