import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet,SafeAreaView,FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import SubjectButton from '../components/SubjectsButton';
import CourseButtonEnroll from '../components/CourseButtonEnroll';
import $api from '../api/client';
import CourseButton from '../components/CourseButton';

const ExploreScreen = (props) => {
    const [rerender, setRerender] = useState(false);
    const [query,setQuery]=useState('')
    const [subjects,setSubject]=useState()
    const [courses,setCourses]=useState()
    const [courses_mine,setCourses_mine]=useState()
    const [courses_all,setCourses_all]=useState()
    const [switcher,setSwitcher]=useState(true)

    useEffect(()=>{
      console.log("sss")
      const resp=$api.get(`api/subject/`)
      resp.then(resp=>setSubject(resp.data)).catch(err=>console.log(err))
      $api.get("api/course/")
      .then(resp => {setCourses_all(resp.data)})
      .catch(err => console.warn(err));
      $api.get(`api/student/course/`)
      .then(resp=>setCourses_mine(resp.data)).catch(err=>console.log(err))
      },[rerender]) 


    let SearchCourse=async ()=>{
    let course_set=courses_all.filter(({ title }) =>title.includes(query))
    let course_mine_set=courses_mine.map(x=>x.id)
    course_set=course_set.filter(x =>{!console.log(course_mine_set) ;return !course_mine_set.includes(x.id)})
    setCourses(course_set)
    setSwitcher(false)
    }


    const EnrollCours=(item)=>{
      $api.post(`api/student/course/${item.id}/`).
      then(resp=>{console.log(resp.data);}).
      catch(err=>console.log(err))
      SearchCourse()
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
  
    let listItemViewSubjects = ({ item }) => {
      return (
        <SubjectButton Click={()=>{props.navigation.navigate("AllCoursesScreen",{"subject":item.id})}}
        title={item.title}/>
      );
    };

    let listItemViewCourses = ({ item }) => {
      return (
        <CourseButtonEnroll EnrollCours={()=>{EnrollCours(item)}} Click={()=>{props.navigation.navigate("ModuleScreen",{"module":item.id})}}
        title={item.title}/>
      );
    };


    return (
      <View style={styles.container}>
        <Searchbar
        placeholder="Search"
        onChangeText={q => { setQuery(q);if(q==''){setSwitcher(true)} }}
        value={query}
        onIconPress={()=>{SearchCourse(query)}}
      />
        <SafeAreaView>
{switcher  ?(
        <FlatList
          data={subjects}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ listItemViewSubjects}
          />):(<FlatList
            data={courses}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ listItemViewCourses}
            />)}
        </SafeAreaView>
      </View>

    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "rgba(209, 209, 209, 1)",
  },
});
