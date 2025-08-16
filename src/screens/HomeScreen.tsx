/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import { Text, Image, ActivityIndicator, FlatList, View } from 'react-native';
import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../AppTheme';
import usePokemonPaginated from '../hooks/usePokemonPaginated';

import PokemonCard from '../components/PokemonCard';

// 'ellipsis-vertical-circle-outline';

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isLoading, simplePokemonList, loadPokemons } = usePokemonPaginated();
  return (
    <View style={{ ...styles.globalMargin, alignItems: 'center' }}>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokeBolaBG}
      />

      {isLoading && <ActivityIndicator size={30} />}

      {simplePokemonList && (
        <FlatList
          ListHeaderComponentStyle={{
            position: 'relative',
          }}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
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
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator
              style={{ height: 100 }}
              size={20}
              color={'grey'}
            ></ActivityIndicator>
          }
        ></FlatList>
      )}
    </View>
  );
};

export default HomeScreen;
