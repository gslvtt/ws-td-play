<template>
  <form @submit.prevent="submitTextAction">
        <button class="delete-button" v-if="mode==='delete'" @click="removeAction(index)"></button>
        <h3 class="action-title">{{title}}</h3>
        <p class="italic">{{actionName}}</p>
        <!-- <p>step: {{ step }}</p> -->
        <div class="input-group">
          <textarea class="text-area-input" rows="3" placeholder="Type text" v-model.trim="text" required></textarea>
        </div>
        <p> {{ lastSent || '-'}}</p>
        <button type="submit">Send</button>
  </form>
</template>

<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { DataWS } from '../useSocketTools';
  // Loss of reactivity of props is not relevant.
  const { title, actionName, index} = defineProps<{
    title: string;
    actionName : string;
    step : number;
    range? : [number, number];
    index : number;
    removeAction : (index : number) => void;
    mode : string;
  }>()
  const text = ref<string>('');
  const lastSent = ref<string>('');

  const {handleSend} = inject('webSocketTools') as {handleSend : (data : DataWS) => void}

  function updateDate () {
    lastSent.value = new Date().toUTCString();
  }

  function submitTextAction () {
        handleSend({actionName, value : text.value});
        updateDate();
  }

</script>

<style scoped>

</style>