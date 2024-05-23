<template>
  <component :is></component>

</template>

<script setup>
  defineProps<{
    fields: {
      type : 'text' | 'radio' | 'range';
      options : {
        mainLabel? : string | string[];
        default? : string | number | number[];
        required? : boolean;
        radioLabels? : string[];
        placeholder? : string | number | number[];
        inputValidation? : (string | number | number[]) => boolean;
      }
    }[],
    submitHandler : <T>( arg : T ) => void;
  }>

</script>

<style>

</style>