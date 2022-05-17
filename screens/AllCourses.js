import React, { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet ,SafeAreaView,Modal, Alert,ImageBackground,FlatList} from 'react-native';
// import { Modal } from 'react-native-paper';
import $api from '../api/client';
import CourseButton from '../components/CourseButton';
import CourseButtonEnroll from '../components/CourseButtonEnroll';



const AllCourses = (props) => {
    const [rerender, setRerender] = useState(false);
    const [items,setItems]=useState([])



    useEffect(()=>{
    
    const resp=$api.get(`api/student/subject/${props.route.params.subject}/course/`)
    resp.then(resp=>{console.log(resp.data);setItems(resp.data)}).catch(err=>console.log(err))
    },[rerender,props])

    const EnrollCours=(item)=>{
      $api.post(`api/student/course/${item.id}/`).
      then(resp=>{console.log(resp.data);}).
      catch(err=>console.log(err))
    setRerender(!rerender)
    }
   
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
        <CourseButtonEnroll EnrollCours={()=>EnrollCours(item)} Click={()=>props.navigation.navigate("ModuleScreen",{"course":item.id})}
        title={item.title} overview={item.overview}/>
      );
    };





      return (


    <View style={styles.container}> 
        <SafeAreaView >
      
                <FlatList
                  data={items}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ listItemView}
                  />
    
        </SafeAreaView>
            </View> 

        
      );

};

export default AllCourses;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(209, 209, 209, 1)",
    flex: 1, 
  },

});