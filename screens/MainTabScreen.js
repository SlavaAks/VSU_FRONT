import React,{useState,useEffect} from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import CourseScreenMine from './CourseScreenMine';
import EditProfileScreen from './EditeProfileScreen';
import ModuleScreenTeacher from './ModuleScreenTeacher';
import AddContenScreen from './content/AddContentScreen';
import ContentCreateScreen from './content/ContentCreateScreen';
import AllCourses from './AllCourses';
import ModuleScreen from './ModuleScreen';


import {View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useTheme, Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import ContentScreen from './ContentScreen';


const HomeStack = createStackNavigator();
const ExploreStack=createStackNavigator();
const CourseStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = (props) => {
  
  return(
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      {props.route.params.role==2?(
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        navigationOptions={{ header: null }}
        options={{
          tabBarLabel: 'Главная',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />):(<Tab.Screen
        name="Home"
        component={CourseStackScreen}
        navigationOptions={{ header: null }}
        options={{
          tabBarLabel: 'Главная',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />)}
      <Tab.Screen
        name="Details"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: 'Обновления',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        navigationOptions={{ header: null }}
        options={{
          tabBarLabel: 'Профиль',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStackScreen}
        navigationOptions={{ header: null }}
        options={{
          tabBarLabel: 'Поиск',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-search" color={color} size={26}/>
          ),
        }}
      />
    </Tab.Navigator>)
};

export default MainTabScreen;



const ExploreStackScreen=({navigation}) => ( <ExploreStack.Navigator>
  
  <ExploreStack.Screen
  options={{headerShown: false}}
    name="ExploreScreen"
    component={ExploreScreen}
  />
  <ExploreStack.Screen
    name="Courses"
    component={AllCourses}
    options={{
      headerLeft: () => (
        <Icon.Button
          name="arrow-back"
          size={40}
          color="#1f65ff"
          backgroundColor="#ffff"
          onPress={() =>{navigation.navigate("ExploreScreen")}}
          // onPress={() => console.log("lll")}
        />
      ),
    }}
  />


</ExploreStack.Navigator>)




const HomeStackScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [userdata,setUserdata]=useState({"id":" ","email":" ","first_name":" ","last_name":" ","date_joined":" ","city":" ","avatar":" ","country":" "})

 useEffect(()=>{AsyncStorage.getItem('userData').then((userData) => {
     
  if(userData){
      setUserdata(JSON.parse(userData));

  }
});},[AsyncStorage]);

      
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'My courses',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-search"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => {}}
              />
              <TouchableOpacity
                style={{paddingHorizontal: 10, marginTop: 5}}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Avatar.Image
                  source={{
                    uri:userdata.avatar ,
                  }}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
      name="ModuleStudent"
      component={ModuleScreen}
      options={{
        title:"Modules",}}

    />

<HomeStack.Screen
      name="ContentStudent"
      component={ContentScreen}
      options={{
        title:"Content",}}
    />
    </HomeStack.Navigator>
  );


};


const CourseStackScreen=({navigation})=>(

  <CourseStack.Navigator
    initialRouteName="Home">
    <CourseStack.Screen
    options={{headerShown: false}}
      name="Home"
      component={CourseScreenMine}
    />
    <CourseStack.Screen
      options={{headerShown: false}}
      name="ModuleScreenTeacher"
      component={ModuleScreenTeacher}
    />
    <CourseStack.Screen
      name="Content"
      component={AddContenScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="arrow-back"
            size={40}
            color="#1f65ff"
            
            backgroundColor="#ffff"
            onPress={() => navigation.goBack()}
          />
        ),
      }}
    />

  <CourseStack.Screen
      name="Creation"
      component={ContentCreateScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="arrow-back"
            size={40}
            color="#1f65ff"
            backgroundColor="#ffff"
            onPress={() => navigation.goBack()}
          />
        ),
      }}
    />

  </CourseStack.Navigator>
)



const NotificationStackScreen = ({navigation}) =>{ 
  const {colors} = useTheme();
  return (
  <NotificationStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
    <NotificationStack.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={colors.text}
            backgroundColor={colors.background}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </NotificationStack.Navigator>
);}

const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};