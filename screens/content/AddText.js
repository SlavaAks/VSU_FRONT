import React,{useState} from 'react';
import { View, Text, Button, StyleSheet,Alert,TouchableOpacity,TextInput } from 'react-native';
import Mybutton from '../../components/Mybutton';
import Mytextinput from '../../components/Mytextinput';
import $api from '../../api/client';
const AddText = (props) => {
    const [title,setTitle]=useState()
    const [text,setText]=useState()


   
    async function TextContentCreate(){
        
        const data = new FormData();
        data.append('title', title);
        data.append('content', text);
        data.append('content_type',"text")
        console.log(data)
        $api.post(`api/course/module/${props.module}/content/`,data).then(resp=>{
            Alert.alert(
                'Success','Контент добавлен ',
                [{ text: 'Ok',onPress: () => props.navigation.goBack(),},],{cancelable: false},);
        }).catch(err=>console.log(err))

    }

    return ( 
      <View style={styles.container}>
      <TextInput
        placeholder="title"
        textBreakStrategy="simple"
        // onTouchStart={{start:0,end:0}}
        onChangeText={(Texts) => setTitle(Texts)}
        value={title}
        autoCapitalize="sentences"
        style={styles.placeholder}
      ></TextInput>
      <TextInput
        
        multiline={true}
        placeholderTextColor="rgba(0,0,0,1)"
        onChangeText={(Texts) => setText(Texts)}
        value={text}
        style={styles.placeholder2}
      ></TextInput>
      <TouchableOpacity onPress={TextContentCreate} style={styles.button}>
        <Text style={styles.save}>Save</Text>
      </TouchableOpacity>
    </View>
    
    
    
  //   <View style={styles.container}>

  //      <Mytextinput
  //               placeholder="Teмa"
  //               onChangeText={(Texts) => setTitle(Texts)}
  //               value={title}
  //               maxLength={225}
  //               numberOfLines={5}
  //               multiline={true}
  //               style={{textAlignVertical: 'top', padding: 10}}
  //             />
     
  //      <Mytextinput
  //           placeholder="Контент"
  //           onChangeText={(Texts) => setText(Texts)}
  //           value={text}
  //           maxLength={225}
  //           numberOfLines={5}
  //           multiline={true}
  //           style={{ textAlignVertical: 'top', padding: 10 }} />


  //  <Mybutton title="save" customClick={TextContentCreate}/>
  //     </View>
    );
};

export default AddText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    backgroundColor: "rgba(155,155,155,1)"
  },
  placeholder: {
    fontFamily: "roboto-regular",
    color: "#121212",
    flex:1,
    margin:"5%",
    width:"70%",
    
    fontSize: 16,
    backgroundColor: "#fff",
    alignSelf: "center"
  },
  placeholder2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    flex:20,
    width:"80%",
    margin:"5%",
    // width:"60%",
    // height:"80%",
    lineHeight: 16,
    fontSize: 17,
    // textAlign: "center",
    backgroundColor: "#fff",
    alignSelf: "center"
  },
  button: {
    width: "20%",
    marginLeft:"71%",
    marginBottom:"2%",
    flex:1.5,
    backgroundColor: "#E6E6E6",
    borderRadius: 9,
    // marginTop: 567,
    // marginLeft: 250
  },
  save: {
    fontFamily: "roboto-regular",
    color: "rgba(26,10,236,1)",
    fontSize: 16,
    marginTop: "6%",
    marginLeft: "26%"
  }
})