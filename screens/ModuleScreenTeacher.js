import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ModuleScreenTeacher = () => {
    return (
      <View style={styles.container}>
        <Text>ModuleScreenTeacher</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default ModuleScreenTeacher;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
