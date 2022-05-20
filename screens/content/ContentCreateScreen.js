import React,{useState} from 'react';
import { NativeModules, TextInput } from 'react-native';
import { View, Text, Button, StyleSheet,Alert,TouchableOpacity } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import AddFile from './AddFile';
import AddTest from './AddTest';
import AddText from './AddText';
import AddVideo from './AddVideo';

const ContentCreateScreen = (props) => {
  // const [content_type,setContent_type]=useState(props.route.params)
  // console.log(content_type['content_type'])
    return ( 
      <View style={styles.container}>
          {props.route.params.content_type=="text" && <AddText navigation={props.navigation} module={props.route.params.module}/>}
          {props.route.params.content_type=="file" && <AddFile navigation={props.navigation} module={props.route.params.module}/>}
          {props.route.params.content_type=="video" && <AddVideo navigation={props.navigation} module={props.route.params.module}/>}
          {props.route.params.content_type=="test" && <AddTest navigation={props.navigation} module={props.route.params.module}/>}
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
