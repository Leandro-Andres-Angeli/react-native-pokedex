/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchInput from '../components/SearchInput';
import usePokemonSearch from '../hooks/usePokemonSearch';
import globalStyles from '../AppTheme';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();
  const [term, setTerm] = useState('');
  const memoizedPokemonList = useMemo(
    () => simplePokemonList,
    [simplePokemonList],
  );
  const [pokemonFiltered, setPokemonFiltered] =
    useState<Array<SimplePokemon>>();
  useEffect(() => {
    console.log('render');
    if (term.length === 0) {
      setPokemonFiltered([]);
      return;
    }
    if (term.match(/\d/g)?.length === term.length) {
      const pokemonFindRes = memoizedPokemonList.find(el => {
        const matchResult = el.id === term;

        return matchResult;
      });

      // setPokemonFiltered( [ pokemonFindRes && pokemonFindRes]);
      setPokemonFiltered(pokemonFindRes ? [pokemonFindRes] : []);
      return;
    }
    setPokemonFiltered(
      memoizedPokemonList.filter(el => {
        const reg = new RegExp(term, 'gi');

        const matchResult = el.name.match(reg);

        return matchResult !== null;
      }),
    );
  }, [term, memoizedPokemonList]);

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
        onDebounce={(val: string) => setTerm(val)}
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
              {term}
            </Text>
          }
          data={pokemonFiltered}
          keyExtractor={pokemon => pokemon.id.toString()}
          renderItem={({ item }) => {
            return <PokemonCard key={item.id} pokemon={item} />;
          }}
        ></FlatList>
      )}
      {/* <View>
        <Text>{JSON.stringify(pokemonFiltered)}</Text>
      </View> */}
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
