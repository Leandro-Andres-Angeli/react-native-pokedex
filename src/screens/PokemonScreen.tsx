/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { RootStackParams } from '../navigator/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import usePokemon from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';
interface Props
  extends NativeStackScreenProps<RootStackParams, 'PokemonScreen'> {}
const PokemonScreen = (props: Props) => {
  const { simplePokemon, color } = props.route.params;
  const { name, id, picture } = simplePokemon;
  const { navigation } = props;
  const { pokemon, isLoading } = usePokemon(id);

  const { top } = useSafeAreaInsets();
  return (
    <View style={styles.card}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ ...styles.backButton, top: top + 20 }}
          onPress={() => navigation.pop()}
        >
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>
        <Text style={styles.pokemonName}>
          {name + '\n'}#{id}
        </Text>
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      <View style={styles.pokemonData}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={'grey'} size={30} />
          </View>
        )}

        {pokemon && !isLoading && <PokemonDetails {...{ pokemon }} />}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 370,

    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    backgroundColor: 'rgba(13, 29, 30, 0.06)',
    padding: 10,
    zIndex: 9999,
    borderRadius: 100,
    left: 25,
    elevation: 2,
  },
  pokemonName: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 30,

    left: 20,
    top: 40,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.5,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  pokemonData: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PokemonScreen;
