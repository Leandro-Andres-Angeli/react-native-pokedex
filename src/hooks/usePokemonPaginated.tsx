import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

const usePokemonPaginated = () => {
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
  const [isLoading, setIsLoading] = useState(false);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const loadPokemons = async () => {
    setIsLoading(true);
    try {
      const resp = await pokemonApi.get<PokemonPaginatedResponse>(
        nextPageUrl.current,
      );

      //   console.log(resp.data);
      //   setSimplePokemonList(resp.data.results)
      nextPageUrl.current = resp.data.next;
      mapPokemonList(resp.data.results);
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
    () => {
      setIsLoading(false);
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
    setSimplePokemonList(
      simplePokemonList !== undefined
        ? [...simplePokemonList, ...newPokemonList]
        : [...newPokemonList],
    );
  };
  /*   const mapPokemonList = async (pokemonList: Result[]) => {
    try {
      const urls: string[] = pokemonList.map(el => el.url);
      const getPokemonsData = await Promise.all(
        urls.map(url => pokemonApi.get(url)),
      );
       getPokemonsData.forEach(el => {

       })
    } catch (error) {
      console.log('error fetching pokemons');
    }
  }; */
  const loadPokemonsRef = useRef(loadPokemons);
  useEffect(() => {
    loadPokemonsRef.current();
  }, []);
  return { simplePokemonList, isLoading, loadPokemons };
};

export default usePokemonPaginated;
