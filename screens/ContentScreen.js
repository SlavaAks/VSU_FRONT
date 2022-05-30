import React, { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet ,SafeAreaView,FlatList,  PermissionsAndroid,Image,TouchableHighlight,  Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import $api, { API_URL } from '../api/client';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/Feather';
import VideoPlayer from '../components/VideoPlayerCustom';
import { Modal } from 'react-native-paper';
import MaterialCheckboxWithLabel1 from '../components/CheckBox';
import TestChek from '../components/TestChek';
// import VideoPlayer from 'react-native-video-player';



const ContentScreen = (props) => {
    const [rerender, setRerender] = useState(false);
    const [isvisible,setIsvisible]=useState(false);
    const [items,setItems]=useState([])
    useEffect(()=>{
    console.log(props.route.params.module)
    const resp=$api.get(`api/student/course/module/${props.route.params.module}/content/`)
    resp.then(resp=>setItems(resp.data)).catch(err=>err=>console.log(err))
    // console.log(items)
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
    
        Linking.openURL(`${url}`).catch(err =>
          console.error("An error occurred opening the link", err)
        );
      }
  
    let listItemView = (item) => {
      console.log(item)
      return (<>
        {item.content_type=="test" &&
          <View>
            <TestChek title={item.item.title} query={JSON.parse(item.item.item)}></TestChek>
          </View>
        }
        {  item.content_type=="text" && 
             <View key={item.id} style={styles.textContent}>
             <Text style={styles.titleText}>{item.item.title}</Text>
             <Text style={styles.lectureText}> {item.item.item}</Text>
             </View>
        }

        {  item.content_type=="file" && 
             <View key={item.id} style={{backgroundColor: 'white', padding: 20}}>
             <Text>{item.item.title}</Text>
             <TouchableOpacity style={styles.buttonFile} onPress={()=>downloadFile(item.item.item) }> 
             <Icon name="file"  size={50}/>
             </TouchableOpacity>
             </View>
        }

        {  item.content_type=="video" && 
              <View key={item.id} style={styles.videoPlayerContent} >
                <VideoPlayer url={`${item.item.item}`}/> 
              </View>
        }

        {  item.content_type=="image" && 
              <View key={item.id} style={styles. imageContent} >
              
                <Image  source={{
                  uri: `${item.item.item}`,}}
                  style={{height: "100%", width:  "100%"}}
                  imageStyle={{borderRadius: 15}}
                 /> 
              </View>
        }


{  item.content_type=="videourl" && 



  <TouchableHighlight
  underlayColor="rgba(200,200,200,0.6)"
  onPress={()=>openVideo(item.item.item)}
>
  <Text style={styles.videoTile}>Watch--- {item.item.title}</Text>
</TouchableHighlight>
}
        </>
      );
    };



      return (
        <SafeAreaView >
              <FlatList
                data={items}
                ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => listItemView(item)}
              />
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
    },
    textContent:{
      borderColor: '#007FFF',
      borderWidth: 1,
      padding: 20
    },
    titleText:{
     fontSize: 20,
     textAlign: 'center',
     color: '#121212',
     marginBottom:"5%",
    },
    lectureText:{
      fontSize: 16,
      color: '#121212',
     },
     videoPlayerContent:{
      marginTop:15,
      height:300,
      width:"100%"
     }, 
     imageContent:{
       backgroundColor:"#dbdbdb",
      marginTop:15,
      alignSelf:"center",
      height:250,
      width:"90%"
     },
    //  buttonFile:{
    //   width:"8%",
    //   // height: "14%",
    //   backgroundColor: "rgba(209, 209, 209, 1)",
    //   marginTop:"10%",
    //   // borderWidth: 1,
    //   // borderColor: "#000000",
    //   borderRadius: 9,
    //   marginLeft: 10
    //  }
  });
