<template>
  <div id="app">
    <Modes :setMode :mode ></Modes>
    <Actions :setMode :mode></Actions>
  </div>

</template>

<script setup lang="ts">
  import { ref, provide } from 'vue';
  import { type Mode, type SetMode } from './types';
  import Modes from './components/Modes.vue';
  import Actions from './components/Actions.vue'
  import useSocketTools, {type DataWS} from './useSocketTools';

  const mode = ref<Mode>('play');
  const setMode : SetMode = (newMode) => {
    mode.value = newMode;
  }

  const {handleSend} = useSocketTools();
  provide('webSocketTools', {handleSend})

</script>


<style scoped>

#app {
  background-color: var(--color-background);
  width:100vw;
  height:100vh;
  display: flex;
  flex-direction: column;
}

</style>
