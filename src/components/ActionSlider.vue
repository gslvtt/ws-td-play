<template>
  <form @submit.prevent="submitSliderAction">
        <button class="delete-button" v-if="mode==='delete'" @click="removeAction(index)"></button>
        <h3 class="action-title">{{title}}</h3>
        <p class="italic">{{actionName}}</p>
        <p>step: {{ step }}</p>
        <div class="input-group">
          <input class="slider-input" type="range" :step :min="range![0]" :max="range![1]" v-model.number="number" required>
          <p style="width: 1.5rem;">{{number}}</p>
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
    range : [number, number];
    index : number;
    removeAction : (index : number) => void;
    mode: string;
  }>()
  const number = ref<number>((range[1] + range[0])/2);
  const lastSent = ref<string>('');

  const {handleSend} = inject('webSocketTools') as {handleSend : (data : DataWS) => void}

  function validateNumberRange (value : number) {
    return range ? value >= range[0] && value <= range[1] : true;
  }

  function updateDate () {
    lastSent.value = new Date().toUTCString();
  }

  function submitSliderAction () {
      if (validateNumberRange(number.value as number)) {
        handleSend({actionName, value : number.value as number});
        updateDate();

      } else {
        alert('Values are not within the specified range. Please clear the input fields if you wish to consult the specified minimum and maximum.');
      }
  }

</script>

<style scoped>

</style>