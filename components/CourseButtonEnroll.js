import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

function CourseButtonEnroll(props) {
    return (
      <View style={styles.container}>
        <View style={styles.buttonStack}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.imageRow}>
              <Image
                source={require("../assets/Table.png")}
                resizeMode="contain"
                style={styles.image}
              ></Image>
              <Text style={styles.loremIpsum}>{props.title}</Text>
            </View>
            <Text style={styles.loremIpsum3}>{props.overview}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={props.EnrollCours}>
            <Icon name="add" style={styles.icon}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(209, 209, 209, 1)"
    },
    button: {
 
      width: "100%",
      height: "100%",
      marginTop: "5%",
      position: "absolute",
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 9
    },
    image: {
      width: 79,
      height: 51
    },
    loremIpsum: {
      fontFamily: "roboto-500",
      color: "#121212",
      height: 60,
      width: 224,
      fontSize: 16,
      marginLeft: 28,
      marginTop: 7
    },
    imageRow: {
      height: 67,
      flexDirection: "row",
      marginTop: 6,
      marginRight: 14
    },
    loremIpsum3: {
      fontFamily: "roboto-regular",
      color: "#121212",
      height: 59,
      width: 330,
      marginLeft: 9
    },
    button2: {
      marginTop: "2%",
      left: "91%",
      width: 45,
      height: 44,
      // position: "absolute",
      backgroundColor: "rgba(202,244,158,1)",
      borderRadius: 41
    },
    icon: {
      color: "rgba(128,128,128,1)",
      fontSize: 40,
      height: 40,
      width: 40,
      marginTop: 2,
      marginLeft: 2
    },
    buttonStack: {
      width: "82%",
      height: 134,
      marginBottom: "5%",
      marginLeft: "9%"
    }
  });
  
  


export default CourseButtonEnroll;