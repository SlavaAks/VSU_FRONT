// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/
 
// import React in our code
import React, {useState, useRef, useEffect} from 'react';
 
// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View, Dimensions,Modal} from 'react-native';
 
//Import React Native Video to play video
import Video from 'react-native-video';
 
//Media Controls to control Play/Pause/Seek and full screen
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';

const  height  = Dimensions.get('window');
const  width  = Dimensions.get('window');
 
const VideoPlayer = (props) => {
    // $api.get(props.url).then(res=>console.log(res))
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [screenType, setScreenType] = useState('contain');
  
  useEffect(()=>{console.log("Ssss")},[]);

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
    setIsFullScreen(!isFullScreen);
    if (screenType == 'contain') setScreenType('cover');
    else setScreenType('contain');
  };
 
  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );
 
  const onSeeking = (currentTime) => setCurrentTime(currentTime);
  return (
    <View style={{height:"100%",width:Dimensions.get('window').width}}>
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
      <Modal visible={isFullScreen}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        // style={isFullScreen ? styles.fullscreenVideo : styles.video}
        source={{uri:props.url}}
        // source={require("../assets/sample5s.mp4")}
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
      </Modal>
    </View>
  );
};
 
export default VideoPlayer;
 
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
      video: {
        height: Dimensions.get('window').width * (9 / 16),
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
      },
      fullscreenVideo: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
      },
  mediaPlayer: {
    // position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: "100%",
    width: "100%",
    // height: Dimensions.get('window').width,
    // width: Dimensions.get('window').height,
    // aspectRatio: width/height,
    backgroundColor: 'black',
    justifyContent: 'center',

  },
});

// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Dimensions,
//   View,
//   Text,
//   TouchableOpacity,
//   StatusBar,
//   TouchableWithoutFeedback,
//   ScrollView,
// } from 'react-native';
// import Video, {
//   OnSeekData,
//   OnLoadData,
//   OnProgressData,
// } from 'react-native-video';
// import Orientation from 'react-native-orientation-locker';
// import {FullscreenClose, FullscreenOpen} from '../assets/icons';
// import PlayerControls from "../components/PlayerControls"
// import ProgressBar from "../components/ProgressBar"


// interface State {
//   fullscreen: boolean;
//   play: boolean;
//   currentTime: number;
//   duration: number;
//   showControls: boolean;
// }

//  const VideoPlayer: React.FC = () => {
//   const videoRef = React.createRef<Video>();
//   const [state, setState] = useState<State>({
//     fullscreen: false,
//     play: false,
//     currentTime: 0,
//     duration: 0,
//     showControls: true,
//   });

//   useEffect(() => {
//     Orientation.addOrientationListener(handleOrientation);

//     return () => {
//       Orientation.removeOrientationListener(handleOrientation);
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <TouchableWithoutFeedback onPress={showControls}>
//         <View>
//           <Video
//             ref={videoRef}
//             source={{
//               uri:
//                 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//             }}
//             style={state.fullscreen ? styles.fullscreenVideo : styles.video}
//             controls={false}
//             resizeMode={'contain'}
//             onLoad={onLoadEnd}
//             onProgress={onProgress}
//             onEnd={onEnd}
//             paused={!state.play}
//           />
//           {state.showControls && (
//             <View style={styles.controlOverlay}>
//               <TouchableOpacity
//                 onPress={handleFullscreen}
//                 hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
//                 style={styles.fullscreenButton}>
//                 {state.fullscreen ? <FullscreenClose /> : <FullscreenOpen />}
//               </TouchableOpacity>
//               <PlayerControls
//                 onPlay={handlePlayPause}
//                 onPause={handlePlayPause}
//                 playing={state.play}
//                 showPreviousAndNext={false}
//                 showSkip={true}
//                 skipBackwards={skipBackward}
//                 skipForwards={skipForward}
//               />
//               <ProgressBar
//                 currentTime={state.currentTime}
//                 duration={state.duration > 0 ? state.duration : 0}
//                 onSlideStart={handlePlayPause}
//                 onSlideComplete={handlePlayPause}
//                 onSlideCapture={onSeek}
//               />
//             </View>
//           )}
//         </View>
//       </TouchableWithoutFeedback>
//       <ScrollView>
//         <Text style={styles.text}>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus enim
//           suscipit ipsa impedit laboriosam saepe, sapiente excepturi molestiae
//           laudantium, non tempora cumque, quam assumenda deserunt? Similique
//           eaque voluptas itaque corporis. Lorem ipsum dolor sit amet consectetur
//           adipisicing elit. Sequi unde iusto vel facere quibusdam nisi placeat,
//           debitis veritatis autem deserunt at voluptas nam ut mollitia qui fugit
//           minus minima quod.
//         </Text>
//       </ScrollView>
//     </View>
//   );

//   function handleOrientation(orientation: string) {
//     orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
//       ? (setState(s => ({...s, fullscreen: true})), StatusBar.setHidden(true))
//       : (setState(s => ({...s, fullscreen: false})),
//         StatusBar.setHidden(false));
//   }

//   function handleFullscreen() {
//     state.fullscreen
//       ? Orientation.unlockAllOrientations()
//       : Orientation.lockToLandscapeLeft();
//   }

//   function handlePlayPause() {
//     // If playing, pause and show controls immediately.
//     if (state.play) {
//       setState({...state, play: false, showControls: true});
//       return;
//     }

//     setState({...state, play: true});
//     setTimeout(() => setState(s => ({...s, showControls: false})), 2000);
//   }

//   function skipBackward() {
//     videoRef.current.seek(state.currentTime - 15);
//     setState({...state, currentTime: state.currentTime - 15});
//   }

//   function skipForward() {
//     videoRef.current.seek(state.currentTime + 15);
//     setState({...state, currentTime: state.currentTime + 15});
//   }

//   function onSeek(data: OnSeekData) {
//     videoRef.current.seek(data.seekTime);
//     setState({...state, currentTime: data.seekTime});
//   }

//   function onLoadEnd(data: OnLoadData) {
//     setState(s => ({
//       ...s,
//       duration: data.duration,
//       currentTime: data.currentTime,
//     }));
//   }

//   function onProgress(data: OnProgressData) {
//     setState(s => ({
//       ...s,
//       currentTime: data.currentTime,
//     }));
//   }

//   function onEnd() {
//     setState({...state, play: false});
//     videoRef.current.seek(0);
//   }

//   function showControls() {
//     state.showControls
//       ? setState({...state, showControls: false})
//       : setState({...state, showControls: true});
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ebebeb',
//   },
//   video: {
//     height: Dimensions.get('window').width * (9 / 16),
//     width: Dimensions.get('window').width,
//     backgroundColor: 'black',
//   },
//   fullscreenVideo: {
//     height: Dimensions.get('window').width,
//     width: Dimensions.get('window').height,
//     backgroundColor: 'black',
//   },
//   text: {
//     marginTop: 30,
//     marginHorizontal: 20,
//     fontSize: 15,
//     textAlign: 'justify',
//   },
//   fullscreenButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//     paddingRight: 10,
//   },
//   controlOverlay: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#000000c4',
//     justifyContent: 'space-between',
//   },
// });

// export default VideoPlayer;