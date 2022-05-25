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

import {View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useTheme, Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
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
        component={CourseScreenMine}
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
        component={ExploreScreen}
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


const HomeStackScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [userdata,setUserdata]=useState({"id":" ","email":" ","first_name":" ","last_name":" ","date_joined":" ","city":" ","avatar":" ","country":" "})

 useEffect(()=>{AsyncStorage.getItem('userData').then((userData) => {
     
  if(userData){
      setUserdata(JSON.parse(userData));

  }
});},[AsyncStorage]);

      
  console.log(userdata.avatar)
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
    </HomeStack.Navigator>
  );
};


const NotificationStackScreen = ({navigation}) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
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
            backgroundColor="#1f65ff"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </NotificationStack.Navigator>
);

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