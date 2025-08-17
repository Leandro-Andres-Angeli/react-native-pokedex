import { useEffect, useRef, useState } from 'react';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { pokemonApi } from '../api/pokemonApi';

const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonFull>();
  const isMounted = useRef(true);
  const loadPokemon = async () => {
    setIsLoading(true);
    try {
      const pokemonRequest = await pokemonApi<PokemonFull>(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
      );

      setPokemon(await pokemonRequest.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const loadPokemonRef = useRef(loadPokemon);
  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      loadPokemonRef.current();

      return;
    }

    return () => {
      isMounted.current = false;
      return;
    };
  }, []);
  return { isLoading, pokemon };
};

export default usePokemon;
