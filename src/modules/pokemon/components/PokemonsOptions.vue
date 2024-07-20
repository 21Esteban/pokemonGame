<template>
  <section class="mt-5">
    <button
      v-for="option in options"
      :key="option.id"
      class="capitalize"
      @click="emits('selected-options', option.id)"
      
    >
      {{ option.name }}
    </button>
  </section>
</template>

<script setup lang="ts">
const props = defineProps(["options", "blockOptions"]);
const emits = defineEmits(["selected-options"]);

console.log(props.options[0].name);
</script>

<style>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}
</style>
