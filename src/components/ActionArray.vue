<template>
  <form @submit.prevent="submitArrayAction">
        <button class="delete-button" v-if="mode==='delete'" @click="removeAction(index)"></button>
        <h3 class="action-title">{{title}}</h3>
        <p class="italic">{{actionName}}</p>
        <p>step: {{ step }}</p>
        <div class="input-group">
          <input class="number-input" type="number" :step :placeholder="range ? `min: ${range[0]}` : 'no-range'" v-model.number="array[0]" required>
          <input class="number-input" type="number" :step :placeholder="range ? `max: ${range[1]}` : 'no-range'" v-model.number="array[1]" required>
        </div>
        <p> {{ lastSent || '-'}}</p>
        <button type="submit">Send</button>
  </form>
</template>

<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { DataWS } from '../useSocketTools';
  // Loss of reactivity of props is not relevant.
  const { title, actionName, range, step, index} = defineProps<{
    title: string;
    actionName : string;
    step : number;
    range? : [number, number];
    index: number;
    removeAction : (index : number) => void;
    mode : string;
  }>()
  const array = ref<[number, number] | [string, string]>(['','']);
  const lastSent = ref<string>('');


  const {handleSend} = inject('webSocketTools') as {handleSend : (data : DataWS) => void}

  function validateArrayRange (values : [number, number]) {
    return range ? values.every(value => value >= range[0] && value <= range[1]) : true;
  }

  function updateDate () {
    lastSent.value = new Date().toUTCString();
  }

  function submitArrayAction () {
      if (validateArrayRange(array.value as [number, number])) {
        handleSend({actionName, value : array.value as [number, number]});
        updateDate();
      } else {
        alert('Values are not within the specified range. Please clear the input fields if you wish to consult the specified minimum and maximum.');
      }
  }

</script>

<style scoped>

</style>