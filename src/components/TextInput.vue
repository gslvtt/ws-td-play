<template>
  <div class="input-group">
      <p v-if="mainLabel" class="input-label">{{mainLabel}}:</p>
      <input class="text-input" type="text" v-model="text" :required :placeholder>
  </div>
</template>

<script setup>
  defineProps<{
    mainLabel? : string;
    // default? : string
    required? : boolean;
    placeholder?
    // inputValidation? : (text : string) => boolean;
    text : string;
  }>()

  // const text = ref<string>(default || '');

</script>

<style>

</style>