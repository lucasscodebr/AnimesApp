import React from 'react'
import { ContainerEpisode, ContainerText, DescriptionText, ImgEpisode } from './style';


const Episode = ({ name, image, onPress}) => {

    return <ContainerEpisode onPress={(onPress)}>
                <ImgEpisode source={{uri : image}}/>
                <ContainerText>
                    {name.split(' - ', 2).map(txt => <DescriptionText key={txt} >
                                                        {`${txt.trim()}`}
                                                    </DescriptionText>)}  
                </ContainerText>
           </ContainerEpisode>
}

export default Episode;