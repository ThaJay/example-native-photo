import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import constants from '../constants/Layout'

export default function DetailsScreen(props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={props.route.params}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: constants.window.width,
    height: constants.window.height
  }
});
