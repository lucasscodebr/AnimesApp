import React from 'react'
import { ContainerVideo } from './style';
import VideoPlayer from 'react-native-video-controls';

class Video extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            arrayVideos: props.route.params.arrayVideos
        }
    }

    handleVideosPlayerError() {

    }

    render() {
        return <ContainerVideo>
                    <VideoPlayer 
                        source={{uri : this.state.arrayVideos[0].playerUrl}} 
                        onBack={ () => this.props.navigation.goBack() } 
                        onError={ () => this.handleVideosPlayerError() }  />
                </ContainerVideo>
    }
}

export default Video;