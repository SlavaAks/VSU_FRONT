import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

function CourseButton(props) {
  return (
    // <View style={styles.container}>
    //   <TouchableOpacity
    //     onPress={props.Click}
    //     style={styles.button}
    //   >
    //     <View style={styles.imageRow}>
    //       <Image
    //         source={require("../assets/book-png-icon-5.png")}
    //         resizeMode="contain"
    //         style={styles.image}
    //       ></Image>
    //       <View style={styles.rect}>
    //         <View style={styles.group3}>
    //           <Text style={styles.loremIpsum}>{props.title}</Text>
    //         </View>
    //       </View>
    //     </View>
    //     <View style={styles.group2}>
    //       <Text style={styles.loremIpsum3}>{props.overview}</Text>
    //     </View>
    //   </TouchableOpacity>
    // </View>
    <View style={styles.group2}>
    <TouchableOpacity  onPress={props.Click} style={styles.button}>
      <View style={styles.imageRow}>
        <Image
          source={require("../assets/Table.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Text style={styles.loremIpsum}>{props.title}</Text>
      </View>
      <View style={styles.group}>
        <Text style={styles.loremIpsum2}>
        {props.overview}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
  );
}


const styles = StyleSheet.create({
  group2: {
    width: 400,
    height: 126,
    marginTop: 15,
    alignSelf: "center"
  },
  button: {
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 9,
    flex: 1
  },
  image: {
    width: 58,
    height: 56
  },
  loremIpsum: {
    fontFamily: "roboto-500",
    color: "#121212",
    height: 50,
    width: 252,
    fontSize: 20,
    marginLeft: 21,
    marginTop: 6
  },
  imageRow: {
    height: 56,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 13,
    marginRight: 12
  },
  group: {
    width: 331,
    height: 39,
    overflow: "scroll",
    marginTop: 13,
    marginLeft: 13
  },
  loremIpsum2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: 331,
    fontSize: 16
  }
});

// const styles = StyleSheet.create({
//   container: {
//     width: 344,
//     height: 178
//   },
//   button: {
//     width: 344,
//     height: 178,
//     backgroundColor: "rgba(255,255,255,1)",
//     borderWidth: 1,
//     borderColor: "#000000",
//     borderRadius: 25,
//     shadowColor: "rgba(0,0,0,1)",
//     shadowOffset: {
//       width: 3,
//       height: 3
//     },
//     elevation: 5,
//     shadowOpacity: 0.47,
//     shadowRadius: 0
//   },
//   image: {
//     width: 99,
//     height: 75
//   },
//   rect: {
//     width: 209,
//     height: 86,
//     overflow: "scroll",
//     shadowColor: "rgba(0,0,0,1)",
//     shadowOffset: {
//       width: 3,
//       height: 3
//     },
//     elevation: 5,
//     shadowOpacity: 0.01,
//     shadowRadius: 0,
//     marginLeft: 6
//   },
//   group3: {
//     width: 206,
//     height: 85,
//     justifyContent: "center"
//   },
//   loremIpsum: {
//     fontFamily: "roboto-700",
//     color: "#121212",
//     height: 85,
//     width: 206,
//     fontSize: 15,
//     alignSelf: "center"
//   },
//   imageRow: {
//     height: 86,
//     flexDirection: "row",
//     marginTop: 9,
//     marginLeft: 5,
//     marginRight: 26
//   },
//   group2: {
//     width: 322,
//     height: 53,
//     overflow: "scroll",
//     marginTop: 13,
//     marginLeft: 12
//   },
//   loremIpsum3: {
//     fontFamily: "roboto-regular",
//     color: "#121212",
//     height: 43,
//     width: 284,
//     fontSize: 12
//   }
// });

export default CourseButton;