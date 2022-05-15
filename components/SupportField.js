// import React, { Component,useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity
// } from "react-native";
// import Icon from "react-native-vector-icons/Entypo";

// function  SupportField(props) {
//     const [complain,setComplain]=useState()
//     return (
//     <View style={styles.container}>
//       <View style={styles.group3}>
//         <View style={styles.group2}>
//           <Text style={styles.loremIpsum}>
//             Отправьте интересующие вас вопросы в службу поддержки
//           </Text>
//           <TextInput
//             placeholder=""
//             clearButtonMode="while-editing"
//             keyboardAppearance="light"
//             dataDetector="all"
//             caretHidden={false}
//             multiline={true}
//             onChange={(text)=>{setComplain(text)}}
//             blurOnSubmit={false}
//             style={styles.textInput}
//           ></TextInput>
//           <TouchableOpacity onPress={()=>props.Reply(complain)} style={styles.button2}>
//             <Icon name="arrow-right" style={styles.icon}></Icon>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: 316,
//     height: 297
//   },
//   group3: {
//     width: 316,
//     height: 297
//   },
//   group2: {
//     flex: 1
//   },
//   loremIpsum: {
//     fontFamily: "roboto-700",
//     color: "#121212",
//     height: 49,
//     width: 316,
//     fontSize: 17
//   },
//   textInput: {
//     fontFamily: "times-new-roman-regular",
//     color: "rgba(16,1,1,1)",
//     height: 184,
//     borderWidth: 1,
//     borderColor: "rgba(11,91,186,1)",
//     borderStyle: "solid",
//     backgroundColor: "rgba(230, 230, 230,0.52)",
//     marginTop: 15
//   },
//   button2: {
//     width: 169,
//     height: 48,
//     backgroundColor: "rgba(74,144,226,1)",
//     marginTop: 1,
//     marginLeft: 147
//   },
//   icon: {
//     color: "rgba(0,0,0,1)",
//     fontSize: 40,
//     marginTop: 5,
//     marginLeft: 76
//   }
// });

// export default SupportField;


import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import CupertinoHeaderWithActionButton from "../components/Headers";
import Icon from "react-native-vector-icons/Feather";

function SupportField(props) {
  return (
    <View style={styles.container}>
    <StatusBar animated />
    <CupertinoHeaderWithActionButton
      style={styles.cupertinoHeaderWithActionButton}
    ></CupertinoHeaderWithActionButton>
    <View style={styles.placeholderStack}>
      <TextInput
        placeholder="placeholder"
        style={styles.placeholder}
      ></TextInput>
      <Text style={styles.coreIssue}>Core issue</Text>
    </View>
    <View style={styles.placeholder2Stack}>
      <TextInput
        placeholder="placeholder"
        multiline={true}
        style={styles.placeholder2}
      ></TextInput>
      <Text style={styles.additionalComments}>Additional comments</Text>
    </View>
    <TouchableOpacity style={styles.button}>
      <Icon name="file" style={styles.icon}></Icon>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(254,252,234,1)"
  },
  cupertinoHeaderWithActionButton: {
    height: 45,
    marginTop: 23
  },
  placeholder: {
    top: 26,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 59,
    width: 353,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 9,
    left: 0
  },
  coreIssue: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(155,155,155,1)",
    height: 27,
    width: 167
  },
  placeholderStack: {
    width: 353,
    height: 85,
    marginTop: 70,
    marginLeft: 10
  },
  placeholder2: {
    top: 22,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 115,
    width: 353,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8
  },
  additionalComments: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(155,155,155,1)",
    height: 25,
    width: 249
  },
  placeholder2Stack: {
    width: 353,
    height: 137,
    marginTop: 29,
    marginLeft: 10
  },
  button: {
    width: 53,
    height: 56,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 9,
    marginTop: 5,
    marginLeft: 10
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    width: 42,
    height: 44,
    marginTop: 5,
    marginLeft: 6
  }
});

export default SupportField;
