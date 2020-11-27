import React from 'react'
import { ContainerVideo } from './style';
import VideoPlayer from 'react-native-video-controls';

const Video = (props) => {

    const {urlVideo} = props.route.params

    return <ContainerVideo>
                <VideoPlayer 
                    source={{uri : urlVideo}} 
                    onBack={ () => props.navigation.goBack() } 
                    onError={() => console.warn('Erro ao carregar video')}  />
           </ContainerVideo>
}

export default Video;