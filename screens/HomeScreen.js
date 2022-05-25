import React, { useEffect,useState,useCallback } from 'react';
import { View, Text, Button, StyleSheet ,SafeAreaView,Modal, Alert,ImageBackground,FlatList,RefreshControl} from 'react-native';
// import { Modal } from 'react-native-paper';
import $api from '../api/client';
import CourseButton from '../components/CourseButton';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = (props) => {
    const [rerender, setRerender] = useState(false);
    const [items,setItems]=useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(1000).then(() => setRefreshing(false));
    }, []);


    useEffect(()=>{
    const resp=$api.get(`api/student/course/`)
    resp.then(resp=>setItems(resp.data)).catch(err=>console.log(err))
    },[rerender])


   
    let listViewItemSeparator = () => {
      return (
        <View
          style={{
            height: 0.2,
            width: '100%',
            backgroundColor: '#808080',
          }}
        />
      );
    };
  
    let listItemView = ({ item }) => {

      return (
        <CourseButton Click={()=>props.navigation.navigate("ModuleScreen",{"course":item.id})}
        title={item.title} overview={item.overview}/>
      );
    };





      return (

        <>
      <View style={styles.container}>
        {/* <ImageBackground source={require("../assets/VSU.png")}  resizeMode="cover" style={styles.image}> */}
        <SafeAreaView>
          
                <FlatList
                  data={items}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ listItemView}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  />
        </SafeAreaView>
        </View>

          {/* </ImageBackground> */}
          </>
        
      );

};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(254,254,247,1)",
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});