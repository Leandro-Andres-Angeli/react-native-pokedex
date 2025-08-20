import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import SearchScreen from '../screens/SearchScreen';
import PokemonScreen from '../screens/PokemonScreen';

export type RootStackParams = {
  SearchScreen: undefined;
  PokemonScreen: { simplePokemon: SimplePokemon; color: string };
};
const Stack = createNativeStackNavigator<RootStackParams>();

const Tab2 = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SearchScreen"
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
};
export default Tab2;
