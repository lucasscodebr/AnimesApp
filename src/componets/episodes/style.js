import styled from 'styled-components/native';

export const ContainerEpisode = styled.TouchableOpacity`
    flex : 1;
    height : auto;
    flexDirection : row;
    borderBottomWidth : 1px;
    borderBottomColor : #000;
    backgroundColor : rgb(43,43,43);
`
export const ImgEpisode = styled.Image`
    width : 120px;
    height : 80px;
    marginRight : 10px;
`
export const ContainerText = styled.View`
    justifyContent : center;
    width : auto;
`
export const DescriptionText = styled.Text`
    color : #33ff58;
    textAlign : justify;
`