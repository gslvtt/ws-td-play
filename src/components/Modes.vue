<template>
  <div class="modes-container">
    <button :class="mode === 'play' ? 'selected modes-button' : 'modes-button'" @click="setMode('play')">Play</button>
    <button :class="mode === 'move' ? 'selected modes-button' : 'modes-button'" @click="setMode('move')">Move</button>
    <button :class="mode === 'add' ? 'selected modes-button' : 'modes-button'" @click="setMode('add')">Add</button>
    <button :class="mode === 'delete' ? 'selected modes-button' : 'modes-button'" @click="setMode('delete')">Delete</button>
  </div>
</template>

<script setup lang="ts">
  import { type Mode, type SetMode } from '../types';
  const props = defineProps<{ setMode : SetMode; mode: Mode}>()

</script>

<style scoped>
.modes-container {
  width: 100%;
  display: flex;
  justify-content: center;
  gap:2rem;
  padding: 1rem;
  height:4rem;
}

.modes-button {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: larger;
  background: var(--color-background-secondary);
  color: var(--color-text-main);
  height:2rem;
  line-height: 0;
  border : 2px outset var(--color-text-main);
  /* border: outset; */

}

.modes-button:hover {
  cursor: pointer;
  border: 2px inset;
}


.selected {
  background: var(--color-interactive-passive);
}

</style>