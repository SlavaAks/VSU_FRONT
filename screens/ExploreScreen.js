import React,{useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const ExploreScreen = () => {
    [query,setQuery]=useState()
    return (
      <View style={styles.container}>
        <Text>ExploreScreen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
        <Searchbar
        placeholder="Search"
        onChangeText={q => { setQuery(q) }}
        value={query}
      />
      </View>

    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
