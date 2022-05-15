import React,{useState} from 'react';
import { View, Text, StyleSheet,Alert,TouchableOpacity } from 'react-native';
import Mytextinput from '../../components/Mytextinput';
import $api from '../../api/client';
import DocumentPicker from 'react-native-document-picker';
const AddVideo = (props) => {
    const [title,setTitle]=useState()

    const [singleFile, setSingleFile] = useState(null);

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
           props.navigation.navigate("ContentScreenTeacher",{"module":props.module})
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





    return ( <View style={styles.container}>
       <Mytextinput
                placeholder="Teмa"
                onChangeText={(Texts) => setTitle(Texts)}
                value={title}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              
      {singleFile != null ? (
        <Text style={styles.textStyle}>
          File Name: {singleFile[0].name ? singleFile[0].name:''}
          {'\n'}
          Type: {singleFile[0].type ? singleFile[0].type : ''}
          {'\n'}
          File Size: {singleFile[0].size ? singleFile[0].size : ''}
          {'\n'}
          URI: {singleFile[0].uri ? singleFile[0].uri : ''}
          {'\n'}
        </Text>
      ) : null}
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={uploadFile}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </TouchableOpacity>
      </View>
    );
};

export default AddVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  }
});
