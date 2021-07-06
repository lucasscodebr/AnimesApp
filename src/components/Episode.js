import React from 'react'
import {ContainerEpisode, ContainerText, DescriptionText, ImgEpisode} from '../styles/components/Episode'

const Episode = (props) => {
    return (
        <ContainerEpisode onPress={props.episode.onPress}>
            <ImgEpisode source={{uri: props.episode.thumbnail}} />
            <ContainerText>
                <DescriptionText>Episode : {props.episode.number}</DescriptionText>
                <DescriptionText>{props.episode.title.trim()}</DescriptionText>
            </ContainerText>
        </ContainerEpisode>
    )
}

export default Episode
