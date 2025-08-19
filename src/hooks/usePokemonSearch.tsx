import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const loadPokemons = async () => {
    try {
      const resp = await pokemonApi.get<PokemonPaginatedResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=1200',
      );

      //   console.log(resp.data);
      //   setSimplePokemonList(resp.data.results)

      mapPokemonList(resp.data.results);
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsFetching(false);
    }
    () => {
      setIsFetching(false);
      return;
    };
  };
  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return { id, name, picture };
    });
    setSimplePokemonList(newPokemonList);
  };

  const loadPokemonsRef = useRef(loadPokemons);
  useEffect(() => {
    console.log('loading');
    loadPokemonsRef.current();
  }, []);
  return { simplePokemonList, isFetching };
};

export default usePokemonSearch;
