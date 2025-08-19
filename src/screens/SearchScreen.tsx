/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchInput from '../components/SearchInput';
import usePokemonSearch from '../hooks/usePokemonSearch';
import globalStyles from '../AppTheme';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';

const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();
  if (isFetching) {
    return <Loading activityContainer={styles.activityContainer}></Loading>;
  }
  return (
    <View
      style={{
        flex: 1,

        marginTop: top + 10,
        marginHorizontal: 20,
      }}
    >
      <SearchInput
        style={{ position: 'absolute', zIndex: 999, width: '100%' }}
      />

      {simplePokemonList && (
        <FlatList
          ListHeaderComponentStyle={{
            position: 'relative',
            marginTop: top + 40,
          }}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...globalStyles.title,
                ...globalStyles.globalMargin,
                top: top + 20,
                marginBottom: top + 20,
              }}
            >
              Pokedex
            </Text>
          }
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id.toString()}
          renderItem={({ item }) => {
            return <PokemonCard key={item.id} pokemon={item} />;
          }}
        ></FlatList>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SearchScreen;
