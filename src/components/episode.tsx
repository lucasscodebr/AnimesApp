import React from 'react'
import {ContainerEpisode, ContainerText, DescriptionText, ImgEpisode} from '../styles/components/Episode'

export const Episode = (props) => {
    return (
        <ContainerEpisode onPress={props.onPress}>
            <ImgEpisode source={{uri: props.episode.thumbnail}} />
            <ContainerText>
                <DescriptionText>Episodio : {props.episode.number}</DescriptionText>
                <DescriptionText>{props.episode.title.trim()}</DescriptionText>
            </ContainerText>
        </ContainerEpisode>
    )
}
