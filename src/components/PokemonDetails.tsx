/* eslint-disable react-native/no-inline-styles */
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
interface Props {
  pokemon: PokemonFull;
}
const PokemonDetails = ({ pokemon }: Props) => {
  return (
    <ScrollView style={{ ...StyleSheet.absoluteFillObject }}>
      <View style={{ ...styles.container }}>
        <Text style={styles.title}>{pokemon.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          {pokemon.types.map(({ type }) => (
            <Text
              style={{ ...styles.regularText, marginRight: 10 }}
              key={type.name}
            >
              {type.name}
            </Text>
          ))}
        </View>
        <View>
          <Text style={styles.title}>Peso</Text>
          <Text style={styles.regularText}> {pokemon.weight}kg</Text>
        </View>
        <View>
          <Text style={styles.title}>Sprites </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites.back_default}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites.front_shiny}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites.back_shiny}
            style={styles.basicSprite}
          />
        </ScrollView>

        <View>
          <Text style={styles.title}>Skills </Text>

          <View style={{ flexDirection: 'row' }}>
            {pokemon.abilities.map(({ ability }) => (
              <Text
                style={{ ...styles.regularText, marginRight: 10 }}
                key={ability?.name}
              >
                {ability?.name}
              </Text>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.title}>Moves </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {pokemon.moves.map(({ move }) => (
              <Text
                style={{ ...styles.regularText, marginRight: 10 }}
                key={move?.name}
              >
                {move?.name}
              </Text>
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.title}>Moves </Text>

          <View style={{}}>
            {pokemon.stats.map((stat, idx) => (
              <View key={stat.stat.name + idx} style={{ flexDirection: 'row' }}>
                <Text
                  style={{ ...styles.regularText, marginRight: 10, width: 150 }}
                >
                  {stat.stat.name}
                </Text>
                <Text
                  style={{
                    ...styles.regularText,
                    marginRight: 10,
                    width: 150,
                    fontWeight: 'bold',
                  }}
                >
                  {stat.base_stat}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ marginBottom: 20, alignItems: 'center' }}>
            <FadeInImage
              uri={pokemon.sprites.front_default}
              style={styles.basicSprite}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  regularText: {
    fontSize: 17,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
export default PokemonDetails;
