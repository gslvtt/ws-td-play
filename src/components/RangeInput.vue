<template>
  <div class="input-group">
    <p v-if="mainLabel" class="input-label">{{mainLabel}}:</p>
      <input class="text-input" type="number" v-model.number="range[0]" :required :placeholder="placeholder[0]">
      <input class="text-input" type="number" v-model.number="range[1]" :required :placeholder="placeholder[1]">
  </div>
</template>

<script setup>
  defineProps<{
    mainLabel? : string;
    // default? : string
    required? : boolean;
    placeholder? : 
    // inputValidation? : (text : string) => boolean;
    range : number[];
  }>()

  // const text = ref<string>(default || '');

</script>

<style>

</style>