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
        data.append('title', title);
        data.append('file', fileToUpload[0]);
        data.append('content_type',"file")
        // Please change file upload URL
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; ',
          }
        }

        let res = $api.post("api/course/module/3/content/",data,config).then(
          res=>{ if (res.status == 1) {
            alert('Upload Successful');}
          }
        ).catch(err=>console.log(err))
        console.log()


      } else {
        // If no file selected the show alert
        alert('Please Select File first');
      }
    };
  
    const selectFile = async () => {
      // Opening Document Picker to select one file
      try {
        const res = await DocumentPicker.pick({
          // Provide which type of file you want user to pick
          type: [DocumentPicker.types.allFiles],
          // There can me more options as well
          // DocumentPicker.types.allFiles
          // DocumentPicker.types.images
          // DocumentPicker.types.plainText
          // DocumentPicker.types.audio
          // DocumentPicker.types.pdf
        });
        // Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        // Setting the state to show single file attributes
        setSingleFile(res);
      } catch (err) {
        setSingleFile(null);
        // Handling any exception (If any)
        if (DocumentPicker.isCancel(err)) {
          // If user canceled the document selection
          alert('Canceled');
        } else {
          // For Unknown Error
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
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
