<template>
  <form @submit.prevent="submitArrayAction">
        <h3 class="action-title">{{title}}</h3>
        <p class="action-name">{{actionName}}</p>
        <div class="input-group">
          <input class="text-input" type="number" step="any" :placeholder="range ? `min: ${range[0]}` : 'no-range'" v-model.number="array[0]" required>
          <input class="text-input" type="number" step="any" :placeholder="range ? `max: ${range[1]}` : 'no-range'" v-model.number="array[1]" required>
        </div>
        <button type="submit">Send</button>
  </form>
</template>

<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { DataWS } from '../useSocketTools';
  // Loss of reactivity of props is not relevant.
  const { title, actionName, range} = defineProps<{
    title: string;
    actionName : string;
    range? : [number, number];
  }>()
  const array = ref<[number, number]>([0,0]);

  const {handleSend} = inject('webSocketTools') as {handleSend : (data : DataWS) => void}

  function validateArrayRange (values : [number, number]) {
    return range ? values.every(value => value >= range[0] && value <= range[1]) : true;
  }

  function submitArrayAction () {
      if (validateArrayRange(array.value)) {
        handleSend({actionName, value : array.value});
      } else {
        alert('Values are not within the specified range. Please clear the input fields if you wish to consult the specified minimum and maximum.');
      }
  }

</script>

<style scoped>

</style>