// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/
 
// import React in our code
import React, {useState, useRef, useEffect} from 'react';
 
// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
 
//Import React Native Video to play video
import Video from 'react-native-video';
 
//Media Controls to control Play/Pause/Seek and full screen
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';
import $api from '../api/client';
 
const VideoPlayer = (props) => {
    
    // $api.get(props.url).then(res=>console.log(res))
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [
    playerState, setPlayerState
  ] = useState(PLAYER_STATES.PAUSED);
  const [screenType, setScreenType] = useState('content');
  
  useEffect(()=>{},[]);

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };
 
  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };
 
  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };
 
  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };
 
  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };
 
  const onLoadStart = (data) => setIsLoading(true);
 
  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
 
  const onError = () => alert('Oh! ', error);
 
  const exitFullScreen = () => {
    alert('Exit full screen');
  };
 
  const enterFullScreen = () => {};
 
  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };
 
  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );
 
  const onSeeking = (currentTime) => setCurrentTime(currentTime);
  return (
    <View style={{flex: 1}}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{uri:props.url}}
        // source={{
        //   uri:
        //   'http://10.0.2.2:8000/api/student/download/media/video/file_1652012439956.mp4/',
        // }}
        style={styles.mediaPlayer}
        volume={10}
      />
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      />
    </View>
  );
};
 
export default VideoPlayer;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
flex:1,
  },
});