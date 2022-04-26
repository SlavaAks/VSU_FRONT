import React,{useState} from 'react';
import { NativeModules, TextInput } from 'react-native';
import { View, Text, Button, StyleSheet,Alert,TouchableOpacity } from 'react-native';
import Mybutton from '../components/Mybutton';
import Mytextinput from '../components/Mytextinput';
import $api from "../api/client";
import DocumentPicker, { types } from 'react-native-document-picker';
const ContentCreateScreen = (props) => {
    const [title,setTitle]=useState()
    const [text,setText]=useState()
    const [content_type,Setcontent_type]=useState(props.route.params.content_type)

    const [singleFile, setSingleFile] = useState(null);

    const uploadImage = async () => {
      // Check if any file is selected or not
      if (singleFile != null) {
        // If file selected then create FormData
        const fileToUpload = singleFile;
        const data = new FormData();
        data.append('name', 'Image Upload');
        data.append('file_attachment', fileToUpload);
        // Please change file upload URL
        let res = await fetch(
          'http://localhost/upload.php',
          {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data; ',
            },
          }
        );
        let responseJson = await res.json();
        if (responseJson.status == 1) {
          alert('Upload Successful');
        }
      } else {
        // If no file selected the show alert
        alert('Please Select File first');
      }
    };
  
    const selectFile = async () => {
      

    };


    console.log(props.route.params.content_type)

    async function TextContentCreate(){
        var data={title,content:text,content_type}
        $api.post("api/course/module/3/content/",data).then(resp=>{
            Alert.alert(
                'Success','Контент добавлен ',
                [{ text: 'Ok',onPress: () => props.navigation.goBack(),},],{cancelable: false},);
        }).catch(err=>console.log(err))

    }

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
     
          {content_type=="text" &&    <><Mytextinput
            placeholder="Контент"
            onChangeText={(Texts) => setText(Texts)}
            value={text}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{ textAlignVertical: 'top', padding: 10 }} /><Mybutton title="save" customClick={TextContentCreate}/></>}

         {content_type=="file" &&    <><View style={styles.mainBody}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          React Native File Upload Example
        </Text>
        <Text
          style={{
            fontSize: 25,
            marginTop: 20,
            marginBottom: 30,
            textAlign: 'center',
          }}>
          www.aboutreact.com
        </Text>
      </View>
      {/*Showing the data of selected Single file*/}
      {singleFile != null ? (
        <Text style={styles.textStyle}>
          File Name: {singleFile.name ? singleFile.name : ''}
          {'\n'}
          Type: {singleFile.type ? singleFile.type : ''}
          {'\n'}
          File Size: {singleFile.size ? singleFile.size : ''}
          {'\n'}
          URI: {singleFile.uri ? singleFile.uri : ''}
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
        onPress={uploadImage}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </TouchableOpacity>
    </View><Mybutton title="save" customClick={TextContentCreate}/></>}
      </View>
    );
};

export default ContentCreateScreen;

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
