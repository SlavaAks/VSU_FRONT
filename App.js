/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { useEffect } from 'react';
 import { View, ActivityIndicator } from 'react-native';
 import { 
   NavigationContainer, 
   DefaultTheme as NavigationDefaultTheme,
   DarkTheme as NavigationDarkTheme
 } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 
 import { 
   Provider as PaperProvider, 
   DefaultTheme as PaperDefaultTheme,
   DarkTheme as PaperDarkTheme 
 } from 'react-native-paper';
 
 import { DrawerContent } from './screens/DrawerContent';
 
 import HomeScreen from './screens/HomeScreen';
 import MainTabScreen from './screens/MainTabScreen';
 import SupportScreen from './screens/SupportScreen';
 import SettingsScreen from './screens/SettingsScreen';
 import BookmarkScreen from './screens/BookmarkScreen';
 import ContentCreateScreen from './screens/content/ContentCreateScreen';
 import ContentScreen from './screens/ContentScreen';
 import AllCoursesScreen from './screens/AllCourses';
 
 import { AuthContext } from './components/context';
 
 import RootStackScreen from './screens/RootStackScreen';
 
 import AsyncStorage from '@react-native-community/async-storage';
 import AddContenScreen from './screens/content/AddContentScreen';
import CourseScreenMine from './screens/CourseScreenMine';
import ModuleScreenTeacher from './screens/ModuleScreenTeacher';
import ModuleScreen from './screens/ModuleScreen';
import AuthService from './services/AuthService';

 
 const Drawer = createDrawerNavigator();
Drawer.navigationOptions = {
  header: null
}
 
 const App = () => {
   // const [isLoading, setIsLoading] = React.useState(true);
   // const [userToken, setUserToken] = React.useState(null); 
 
   const [isDarkTheme, setIsDarkTheme] = React.useState(false);
 
   const initialLoginState = {
     isLoading: true,
     user: null,
     userToken: null,
   };
 
   const CustomDefaultTheme = {
     ...NavigationDefaultTheme,
     ...PaperDefaultTheme,
     colors: {
       ...NavigationDefaultTheme.colors,
       ...PaperDefaultTheme.colors,
       background: '#ffffff',
       text: '#333333'
     }
   }
   
   const CustomDarkTheme = {
     ...NavigationDarkTheme,
     ...PaperDarkTheme,
     colors: {
       ...NavigationDarkTheme.colors,
       ...PaperDarkTheme.colors,
       background: '#333333',
       text: '#ffffff'
     }
   }
 
   const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
 
   const loginReducer = (prevState, action) => {
     switch( action.type ) {
       case 'RETRIEVE_TOKEN': 
         return {
           ...prevState,
           userToken: action.token,
           user:action.user,
           isLoading: false,
         };
       case 'LOGIN': 
         return {
           ...prevState,
           user: action.user,
           userToken: action.token,
           isLoading: false,
         };
       case 'LOGOUT': 
         return {
           ...prevState,
           user: null,
           userToken: null,
           isLoading: false,
         };
       case 'REGISTER': 
         return {
           ...prevState,
           user: action.user,
           userToken: action.token,
           isLoading: false,
         };
     }
   };
 
   const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
 



   
   const authContext = React.useMemo(() => ({
     signIn: async(JWT) => {
       // setUserToken('fgkj');
       // setIsLoading(false);
 
       const userToken = String(JWT.data.token);
       const userData=JSON.stringify(JWT.data.user)
       
       try {
         await AsyncStorage.setItem('userToken', userToken);
         await AsyncStorage.setItem('userData',JSON.stringify(JWT.data.user))
       } catch(e) {
         console.log(e);
       }
       // console.log('user token: ', userToken);
       dispatch({ type: 'LOGIN', user: userData, token: userToken });
     },
     signOut: async() => {
       // setUserToken(null);
       // setIsLoading(false);
       try {
         await AsyncStorage.removeItem('userToken');
         await AsyncStorage.removeItem('userData')
       } catch(e) {
         console.log(e);
       }
       dispatch({ type: 'LOGOUT' });
     },
     signUp: () => {
       // setUserToken('fgkj');
       // setIsLoading(false);
     },
     toggleTheme: () => {
       setIsDarkTheme( isDarkTheme => !isDarkTheme );
     }
   }), [])
 
   useEffect(() => {
     setTimeout(async() => {
       // setIsLoading(false);
       let userToken;
       let userData;
       let JWT;
       userToken = null;
       userData=null;

       try {
         userToken = await AsyncStorage.getItem('userToken');
        //  console.log(userToken)
        JWT=await AuthService.refresh(userToken)
        console.log(JWT)
        if (JWT==undefined){
          userToken = null;
          userData=null;   
        }
        else{
          userToken = String(JWT.data.token);
          userData=JSON.stringify(JWT.data.user);   
        }
       } catch(e) {
         console.log(e);
       }
       // console.log('user token: ', userToken);
       dispatch({ type: 'RETRIEVE_TOKEN', user:userData,token: userToken });
     }, 1000);
   }, []);
 
   if( loginState.isLoading ) {
     return(
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size="large"/>
       </View>
     );
   }
   return (
     <PaperProvider theme={theme}>
     <AuthContext.Provider value={authContext}>
     <NavigationContainer theme={theme}>
       { loginState.userToken !== null ? (
         <Drawer.Navigator drawerContent={props => <DrawerContent {...props} userdata={loginState.user}/>}>


           <Drawer.Screen name="HomeDrawer"   component={MainTabScreen }   options={{headerShown: false}} initialParams={{role: JSON.parse(loginState.user).groups[0]}} />
           <Drawer.Screen name="CourseScreen" component={CourseScreenMine} options={{headerShown: false}} />
           <Drawer.Screen name="ModuleScreenTeacher" component={ModuleScreenTeacher} options={{headerShown: false}} />
           <Drawer.Screen name="ModuleScreen" component={ModuleScreen}/>
           <Drawer.Screen name="AllCoursesScreen" component={AllCoursesScreen}/>
           <Drawer.Screen name="ContentScreenTeacher" component={AddContenScreen}/>
           <Drawer.Screen name="ContentCreateScreen" component={ContentCreateScreen}/>
           <Drawer.Screen name="ContentScreen" component={ContentScreen}/>
           <Drawer.Screen name="SupportScreen" component={SupportScreen} options={{headerShown: false}}/>
           <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
           <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
         </Drawer.Navigator>
       )
     :
       <RootStackScreen/>
     }
     </NavigationContainer>
     </AuthContext.Provider>
     </PaperProvider>
   );
 }
 
 export default App;
 