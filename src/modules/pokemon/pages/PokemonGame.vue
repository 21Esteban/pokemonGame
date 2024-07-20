<template>
        <section v-if="retornoDelComposable.isLoading.value" class="flex flex-col justify-center items-center w-screen h-screen">
            <h1 class="text-3xl">Espere por favor</h1>
            <h3 class="animate-pulse">Cargando Pokemons</h3>
        </section>
        <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
            <h1 class="m-5">¿Quien es ese Pokemon?</h1>
            {{ retornoDelComposable.gameStatus}}
            <!-- pokemonPicture -->
            <PokemonPicture :pokemon="retornoDelComposable.randomPokemon.value" :showPokemon="retornoDelComposable.gameStatus.value !== GameStatus.Playing"/>

            <!-- PokemonOptions -->  
            <PokemonsOptions :options="retornoDelComposable.pokemonsOptions.value" :blockOptions="retornoDelComposable.disableButtons" @selected-options="retornoDelComposable.checkAnswer"/>

        </section>
</template>
    
<script setup lang='ts'>
import PokemonPicture from "../components/PokemonPicture.vue"
import PokemonsOptions from "../components/PokemonsOptions.vue"
import { usePokemonGame } from "../composables/usePokemonGame";
import { GameStatus } from "../interfaces";

const retornoDelComposable = usePokemonGame()




;
</script>
    
<style>
    
</style>