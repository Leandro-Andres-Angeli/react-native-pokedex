/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../AppTheme';
import usePokemonPaginated from '../hooks/usePokemonPaginated';
import { FadeInImage } from '../components/FadeInImage';
import PokemonCard from '../components/PokemonCard';

// 'ellipsis-vertical-circle-outline';

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isLoading, simplePokemonList, loadPokemons } = usePokemonPaginated();
  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokeBolaBG}
      />

      {isLoading && <ActivityIndicator size={30} />}

      {
        simplePokemonList && (
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
        )
        /*   <View key={el.id}>
              <Text> {el.name}</Text>
              <Image src={el.picture} style={{ width: 30, height: 30 }} />
            </View> */
      }
      {/*    {simplePokemonList &&
        simplePokemonList.map(el => {
          return (
            <View key={el.id}>
              <Text> {el.name}</Text>
              <Image src={el.picture} style={{ width: 30, height: 30 }} />
            </View>
          );
        })} */}
    </>
  );
};

// const styles = StyleSheet.create({
//   globalMargin: {
//     marginHorizontal: 20,
//   },
//   pokeBolaBG: { width: 300, height: 300, top: -100, right: -100, opacity: 0.2 },
// });
export default HomeScreen;
