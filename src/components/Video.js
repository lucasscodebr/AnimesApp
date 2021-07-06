import React from 'react'
import {ContainerVideo} from '../styles/components/Videos'
import VideoPlayer from 'react-native-video-controls'

export default class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayVideos: props.route.params.arrayVideos,
        }
        this.episode = props.route.params.episode
    }

    render() {
        return (
            <ContainerVideo>
                <VideoPlayer
                    source={{uri: this.state.arrayVideos[0].playerUrl}}
                    onBack={() => this.props.navigation.goBack()}
                    onError={() => console.log('error')}
                />
            </ContainerVideo>
        )
    }
}
