import { onMounted, ref, computed } from "vue";
import { GameStatus } from "../interfaces";
import { pokemonApi } from "../api/pokemonApi";
import confetti from "canvas-confetti"

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref([]);
  const pokemonsOptions = ref([]);
  //hacemos hacemos el algoritmos para el pokemon ganador
 const randomPokemon = computed(()=>{
    const randomNumber = Math.floor(Math.random()*pokemonsOptions.value.length)
    console.log("entreee");
    return pokemonsOptions.value[randomNumber]
 })

  const isLoading = computed((): boolean => pokemons.value.length === 0);
  const disableButtons = computed(():boolean=>{
    console.log("desabilite los botnes");
    if(gameStatus.value === GameStatus.Lost){
      return true
    }
    return false
  })

  const getPokemons = async () => {
    const response = await pokemonApi.get("/?limit=151");

    const pokemonsArray: [] = response.data.results.map((pokemon: any) => {
      const urlPath = pokemon.url.split("/");
      return {
        name: pokemon.name,
        id: urlPath[urlPath.length - 2],
      };
    });
    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  function getNextOptions( howMany:number = 4 ){

    gameStatus.value = GameStatus.Playing
    pokemonsOptions.value = pokemons.value.slice(0,howMany);
    pokemons.value = pokemons.value.slice(howMany);

  }

  const checkAnswer = (id:number) =>{
    console.log("holaaa",id);
    
    const hasWon = randomPokemon.value.id === id;

    if(hasWon){
        gameStatus.value = GameStatus.Won;
         confetti({
      particleCount:300,
      spread:150,
      origin:{y:0.6},

    })
    return
    }

    gameStatus.value = GameStatus.Lost
   
  }


  onMounted(async () => {
    await new Promise((r) => setTimeout(r, 1000));
    pokemons.value = await getPokemons();

    getNextOptions();

  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,
    disableButtons,
    //methodss
    getNextOptions,
    checkAnswer
  };
};
