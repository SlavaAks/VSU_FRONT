import React,{useState} from 'react';
import { View, Text, Button, StyleSheet,Alert,TouchableOpacity } from 'react-native';
import Mybutton from '../../components/Mybutton';
import Mytextinput from '../../components/Mytextinput';
import $api from '../../api/client';
const AddText = (props) => {
    const [title,setTitle]=useState()
    const [text,setText]=useState()


   
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
     
       <Mytextinput
            placeholder="Контент"
            onChangeText={(Texts) => setText(Texts)}
            value={text}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{ textAlignVertical: 'top', padding: 10 }} /><Mybutton title="save" customClick={TextContentCreate}/>


   <Mybutton title="save" customClick={TextContentCreate}/>
      </View>
    );
};

export default AddText;

