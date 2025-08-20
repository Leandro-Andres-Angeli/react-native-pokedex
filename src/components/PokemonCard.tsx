/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

import { getPalette } from '@somesoap/react-native-image-palette';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigator/Tab1';
const windowWidth = Dimensions.get('window').width;
const PokemonCard = ({ pokemon }: { pokemon: SimplePokemon }) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  useMemo(
    async function () {
      try {
        if (isMounted.current) {
          const colors = await getPalette(pokemon.picture);

          setBgColor(colors.muted);
        }
      } catch (error) {
        setBgColor('grey');
      }
    },
    [pokemon.picture],
  );
  useEffect(() => {
    return () => {
      isMounted.current = false;
      return;
    };
  }, []);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('PokemonScreen', {
            simplePokemon: pokemon,
            color: bgColor,
          })
        }
      >
        <View
          style={{
            ...styles.cardContainer,
            width: windowWidth * 0.4,
            backgroundColor: bgColor,
          }}
        >
          <View>
            <Text style={styles.name}>
              {pokemon.id} {`\n#` + pokemon.name}
            </Text>
          </View>
          <FadeInImage
            key={pokemon.id}
            uri={pokemon.picture}
            style={styles.pokemonImage}
          />
          <View style={styles.pokebolaContainer}>
            <Image
              source={require('../assets/pokebola-blanca.png')}
              style={styles.pokebola}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,

    position: 'relative',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    height: 100,
    width: 100,
    position: 'absolute',
    bottom: -20,
    right: -10,
    opacity: 0.5,
  },
  pokemonImage: {
    height: 120,
    width: 120,
    position: 'absolute',
    right: -10,
  },
  pokebolaContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    overflow: 'hidden',
  },
});
export default PokemonCard;
