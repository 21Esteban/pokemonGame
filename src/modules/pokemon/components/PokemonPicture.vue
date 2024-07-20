<template>
        <section>
            <img :src="pokemonImage" alt="dito imagen" class="brightness-0 h-[200px]" v-if="!showPokemon">
             <!-- esa clase oscurece por completo nuestra imagen -->
            <img :src="pokemonImage" alt="dito imagen" class= "h-[200px] fade-in" v-else>

           

        </section>
</template>
    
<script setup lang='ts'>
import { computed } from 'vue';

    interface Props{
        pokemon:{
            name:string,
            id:string
        },

        showPokemon:boolean

    }

    const props = defineProps<Props>()

    const pokemonImage = computed(()=>{
        console.log(props.pokemon.id);
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemon.id}.svg`
    })

</script>
    
<style scoped>
    img{
        user-select: none;
        
    }
</style>