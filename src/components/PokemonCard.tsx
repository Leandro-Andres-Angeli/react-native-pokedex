/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
const windowWidth = Dimensions.get('window').width;
const PokemonCard = ({ pokemon }: { pokemon: SimplePokemon }) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={{ ...styles.cardContainer, width: windowWidth * 0.4 }}>
        <View>
          <Text style={styles.name}>
            {pokemon.id} {`\n#` + pokemon.name}
          </Text>
        </View>
        <FadeInImage
          key={pokemon.id}
          uri={pokemon.picture}
          style={{ width: 100, height: 100 }}
        />
        {/* <Image
                    src={item.picture}
                    style={{ width: 100, height: 100 }}
                  /> */}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'red',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
});
export default PokemonCard;
