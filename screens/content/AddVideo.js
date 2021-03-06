import React,{useState} from 'react';
import { View, Text, StyleSheet,Alert,TouchableOpacity,TextInput } from 'react-native';
import $api from '../../api/client';
import DocumentPicker from 'react-native-document-picker';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
const AddVideo = (props) => {
    const [title,setTitle]=useState()
    const [singleFile, setSingleFile] = useState(null);
    const [selectType,setSelectType]=useState( "Video" )

    const [inputUrl,setInputUrl]=useState()

    const addVideoUrl=()=>{
      const data = new FormData();
        data.append('title', title);
        data.append('url', inputUrl);
        data.append('content_type',"videoUrl")

        let res = $api.post(`api/course/module/${props.module}/content/`,data).then(
          res=>{ 
            console.log(res)
            Alert.alert('Upload Successful');
           props.navigation.navigate("Content",{"module":props.module})
            }
          
        ).catch(err=>console.log(err))
      } 
    const uploadFile = async () => {
      if (singleFile != null) {
        const fileToUpload = singleFile;
        const data = new FormData();
        data.append('title', title);
        data.append('video', fileToUpload[0]);
        data.append('content_type',"video")
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; ',
          }
        }

        let res = $api.post(`api/course/module/${props.module}/content/`,data,config).then(
          res=>{ 
            Alert.alert('Upload Successful');
           props.navigation.navigate("Content",{"module":props.module})
            }
          
        ).catch(err=>console.log(err))
          console.log()


      } else {
        Alert.alert('Please Select File first');
      }
    };
  
    const selectFile = async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.video],
        });
        console.log('res : ' + JSON.stringify(res));

        setSingleFile(res);
      } catch (err) {
        setSingleFile(null);
        if (DocumentPicker.isCancel(err)) {
          Alert.alert('Canceled');
        } else {
          Alert.alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    };





    return ( 
    <View style={styles.container}>
      <View style={{flex:1}}>
    <View style={{flexDirection: "row"}}>
    <TouchableOpacity onPress={()=>setSelectType("Video")} style={styles.buttonChoose}>
      <Text style={styles.textChoose}>Video</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>setSelectType("VideoUrl")} style={styles.buttonChoose}>
      <Text style={styles.textChoose}>Video Url</Text>
    </TouchableOpacity>
    </View>
    <Text style={styles.videoTitle}>Video title:</Text>
    <TextInput
      placeholder=""
      textBreakStrategy="highQuality"
      multiline={true}
      style={styles.textInput}
      onChangeText={(text)=>setTitle(text)}
    ></TextInput>
    {selectType=="Video" &&
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button} onPress={selectFile}>
        <Text style={styles.selectFile}>Select file</Text>
      </TouchableOpacity>
      {singleFile != null ? 
                <Animatable.View
                    animation="bounceIn">
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}/>
                </Animatable.View>
      : null}
      <TouchableOpacity style={styles.button1}  onPress={uploadFile}>
        <Text style={styles.uploadFile}>Upload File</Text>
      </TouchableOpacity>
    </View>}
    
    {singleFile != null && selectType=="Video" ? <Text style={styles.fileName}>File Name: {singleFile[0].name}</Text>
    : null}
    {selectType=="VideoUrl" && <View> 
      <Text style={styles.videoUrl}>Video Url:</Text>
    <TextInput
      placeholder=""
      textBreakStrategy="highQuality"
      multiline={true}
      style={styles.textInput2}
      onChangeText={(text)=>setInputUrl(text)}
    />
    <TouchableOpacity style={styles.buttonAddUrl} onPress={addVideoUrl}>
        <Text style={styles.selectFile}>Add Video</Text>
      </TouchableOpacity>
    </View>}
  </View>
  </View>
    );
};

export default AddVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    backgroundColor: "rgba(196,196,196,1)",
  },
  videoTitle: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 25,
    width: 156,
    fontSize: 16,
    marginTop: 114,
    marginLeft: 56
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 91,
    width: 283,
    backgroundColor: "#fff",
    borderRadius: 9,
    fontSize: 16,
    marginLeft: 56
  },
  button: {
    width: 85,
    height: 38,
    backgroundColor: "#E6E6E6",
    borderRadius: 9
  },
  selectFile: {
    fontFamily: "roboto-700",
    color: "rgba(21,1,1,1)",
    height: 19,
    width: 85,
    fontSize: 14,
    textAlign: "center",
    marginTop: 9
  },
  button1: {
    width: 85,
    height: 38,
    backgroundColor: "#E6E6E6",
    borderRadius: 9,
    marginLeft: 80
  },
  uploadFile: {
    fontFamily: "roboto-700",
    color: "rgba(21,1,1,1)",
    height: 19,
    width: 85,
    fontSize: 14,
    textAlign: "center",
    marginTop: 9
  },
  buttonRow: {
    height: 38,
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 71,
    marginRight: 54
  },
  fileName: {
    fontFamily: "roboto-regular",
    color: "rgba(105,101,101,1)",
    height: 106,
    width: 82,
    marginTop: 10,
    marginLeft: 71
  },
  buttonChoose: {
    width: 85,
    height: 38,
    backgroundColor: "#E6E6E6",
    borderRadius: 9,
    marginLeft: 80
  },
  textChoose:{
    fontFamily: "roboto-700",
    color: "rgba(21,1,1,1)",
    height: 19,
    width: 85,
    fontSize: 14,
    textAlign: "center",
    marginTop: 9
  },
  textInput2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height:50,
    width: 283,
    backgroundColor: "#fff",
    borderRadius: 9,
    fontSize: 16,
    marginLeft: 56
  },
  videoUrl: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 25,
    width: 156,
    fontSize: 16,
    marginTop: 30,
    marginLeft: 56
  },
  buttonAddUrl:{
    width: 85,
    height: 38,
    backgroundColor: "#E6E6E6",
    borderRadius: 9,
    marginLeft:"15%",
    marginTop:"5%"
  }
});








              
    //   {singleFile != null ? (
    //     <Text style={styles.textStyle}>
    //       File Name: {singleFile[0].name ? singleFile[0].name:''}
    //       {'\n'}
    //       Type: {singleFile[0].type ? singleFile[0].type : ''}
    //       {'\n'}
    //       File Size: {singleFile[0].size ? singleFile[0].size : ''}
    //       {'\n'}
    //       URI: {singleFile[0].uri ? singleFile[0].uri : ''}
    //       {'\n'}
    //     </Text>
    //   ) : null}
