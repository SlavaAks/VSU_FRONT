import React, { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet ,SafeAreaView,FlatList,  PermissionsAndroid,Image,TouchableHighlight,  Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import $api, { API_URL } from '../api/client';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/Feather';
import VideoPlayer from '../components/VideoPlayerCustom';
import { Modal } from 'react-native-paper';
// import VideoPlayer from 'react-native-video-player';



const ContentScreen = (props) => {
    const [rerender, setRerender] = useState(false);
    const [isvisible,setIsvisible]=useState(false);
    const [items,setItems]=useState([])
    useEffect(()=>{
    console.log(props.route.params.module)
    const resp=$api.get(`api/student/course/module/${props.route.params.module}/content/`)
    resp.then(resp=>setItems(resp.data)).catch(err=>err=>console.log(err))
    console.log(items)
    },[rerender,props])


    const checkPermission = async () => {
    
        // Function to check the platform
        // If Platform is Android then check for permissions.
     
        if (Platform.OS === 'ios') {
          downloadFile();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'Application needs access to your storage to download File',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Start downloading
              downloadFile();
              console.log('Storage Permission Granted.');
            } else {
              // If permission denied then show alert
              Alert.alert('Error','Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.log("++++"+err);
          }
        }
      };
     
      const  downloadFile = async (url) => {
       console.log(url)
        // Get today's date to add the time suffix in filename
        let date = new Date();
        // File URL which we want to download
        let FILE_URL =url;    
        // Function to get extention of the file url
        let file_ext = getFileExtention(FILE_URL);
       
        file_ext = '.' + file_ext[0];
       
        // config: To get response by passing the downloading related options
        // fs: Root directory path to download
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.PictureDir;
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            path:
              RootDir+
              '/file_' + 
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              file_ext,
            description: 'downloading file...',
            notification: true,
            // useDownloadManager works with Android only
            useDownloadManager: true,   
          },
        };

        await config(options)
          .fetch('GET', FILE_URL)
          .then(res => {
            // Alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
            alert('File Downloaded Successfully.');
          }).catch((err)=>console.log(err));
        //   setRerender(!rerender)
      };
     
      const getFileExtention = fileUrl => {
        // To get the file extension
        return /[.]/.exec(fileUrl) ?
                 /[^.]+$/.exec(fileUrl) : undefined;
      };

   
    let listViewItemSeparator = () => {
      return (
        <View
          style={{
            height: 0.2,
            width: '100%',
            backgroundColor: '#808080',
          }}
        />
      );
    };



    function openVideo(url) {
    
        Linking.openURL(`http://10.0.2.2:8000${url}`).catch(err =>
          console.error("An error occurred opening the link", err)
        );
      }
  
    let listItemView = (item) => {
      console.log(item)
      return (<>
        {  item.content_type=="text" && 
             <View key={item.id} style={{backgroundColor: 'white', padding: 20}}>
             <Text>{item.item.title}</Text>
             <Text>{item.item.item}</Text>
             </View>
        }

        {  item.content_type=="file" && 
             <View key={item.id} style={{backgroundColor: 'white', padding: 20}}>
             <Text>{item.item.title}</Text>
             <TouchableOpacity onPress={()=>downloadFile(item.item.item)}> 
             <Icon name="file"  size={26}/>
             </TouchableOpacity>
             </View>
        }

        {  item.content_type=="video" && 


              <View key={item.id} style={{backgroundColor: 'white',marginTop:5,height:200,width:"100%"} } >
            <VideoPlayer url={`${item.item.item}`}/> 
              </View>


          //   <TouchableHighlight
          //   underlayColor="rgba(200,200,200,0.6)"
          //   onPress={()=>openVideo(item.item.item)}
          // >
          //   <Text style={styles.videoTile}>Watch</Text>
          // </TouchableHighlight>
        }
        </>
      );
    };



      return (
        <SafeAreaView style={{flex: 1}}>
          {/* // <View style={{flex: 1, backgroundColor: 'white'}}> */}
            
              <FlatList
                data={items}
                ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => listItemView(item)}
              />
            
        {/* //     <Text
        //       style={{
        //         fontSize: 18,
        //         textAlign: 'center',
        //         color: 'grey',
        //       }}></Text>
        //     <Text
        //       style={{
        //         fontSize: 16,
        //         textAlign: 'center',
        //         color: 'grey',
        //       }}></Text>
        //   </View> */}
        </SafeAreaView>
      );

};

export default ContentScreen;

const styles = StyleSheet.create({
  container: {
    flex:1, 
    alignItems: 'center', 
    justifyContent: 'center'},
    videoTile: {
      alignSelf: "center",
      fontSize: 16,
      marginTop: 15
    }
  });
