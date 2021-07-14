import {Dimensions} from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    width: ${(() => {
        let size = Dimensions.get('screen')

        if (size.height >= size.width)
            return parseInt(Dimensions.get('window').width / 3 || 138) - 10
        else if (size.width >= size.height)
            return parseInt(Dimensions.get('window').height / 3 || 138) - 10
    })()}px;
    height: ${(() => {
        let size = Dimensions.get('screen')

        if (size.height >= size.width)
            return parseInt((Dimensions.get('window').width * 3) / 6) - 10
        else if (size.width >= size.height)
            return parseInt((Dimensions.get('window').height * 3) / 6) - 10
    })()}px;
    margin: 5px;
`
export const ImageAnime = styled.ImageBackground`
    width: ${(() => {
        let size = Dimensions.get('screen')

        if (size.height >= size.width)
            return parseInt(Dimensions.get('window').width / 3 || 128) - 10
        else if (size.width >= size.height)
            return parseInt(Dimensions.get('window').height / 3 || 128) - 10
    })()}px;
    height: ${(() => {
        let size = Dimensions.get('screen')

        if (size.height >= size.width)
            return (
                parseInt((Dimensions.get('window').width * 3) / 6 || 150) - 40
            )
        else if (size.width >= size.height)
            return (
                parseInt((Dimensions.get('window').height * 3) / 6 || 150) - 40
            )
    })()}px;
`
export const ContainerTitle = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgb(43, 43, 43);
    padding: 5px;
`
export const TitleText = styled.Text`
    font-size: 13px;
    align-items: center;
    color: rgb(0, 255, 48);
`
export const ContainerEpsodio = styled.View`
    width: 50px;
    align-items: center;
    background-color: rgb(23, 23, 23);
    padding: 4px;
    opacity: 0.6;
`
export const EpsodioText = styled.Text`
    align-items: center;
    color: #fafafa;
`
