/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}
const SearchInput = ({ style }: Props) => {
  return (
    <View style={{ ...styles.container, ...StyleSheet.flatten(style) }}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="Buscar pokemon"
          style={{ ...styles.textInput, top: 2 }}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        <Icon name="search-outline" size={20} color="grey"></Icon>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textBackground: {
    backgroundColor: '#F3F1F3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});

export default SearchInput;
