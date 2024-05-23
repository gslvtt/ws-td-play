<template>
  <div class="actions-container">
      <CreateActionForm class="action-content" v-if="mode === 'add'" :setMode></CreateActionForm>
      <!-- <Form class="action-content" v-if="mode === 'add'" :setMode></Form> -->
      <ActionArray class="action-content" title="Drop Coordinates" actionName="dropCoords" :step="0.01" :range="[0,1]" ></ActionArray>
      <ActionNumber class="action-content" title="Brightness" actionName="light_one_bright" :step="1" :range="[0,100]" ></ActionNumber>
      <ActionSlider class="action-content" title="Brightness" actionName="light_one_bright" :step="1" :range="[0,100]" ></ActionSlider>

    <div class="action-content">
      <h3>Light 2</h3>
      <p>Sets brightness</p>

    </div>

  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { type Mode, type SetMode } from '../types';
  import CreateActionForm from './CreateActionForm.vue';
  import ActionArray from './ActionArray.vue';
  import ActionNumber from './ActionNumber.vue';
  import ActionSlider from './ActionSlider.vue';

  type Action = {
    title : string;
    actionName : string;
    step : number;
    range? : [number, number];
  }

  // import Form from './Form.vue'
  defineProps<{ setMode : SetMode; mode: Mode}>();

  const actions = ref<Action[]>([])


</script>

<style>

.actions-container {
  display: flex;
  flex-wrap: wrap;
  height: calc(50%-2rem);
  padding: 0rem 2rem;
  gap: 2rem;
}

.action-content {
  height: 280px;
  width: 300px;
  background-color: var(--color-background-secondary);
  /* border: 2px solid var(--color-text-main); */
  padding: 1.5rem;
  gap:0.5rem;
  border-radius:3rem;
  display: flex;
  flex-direction: column;
  color: var(--color-text-main);
  justify-content: space-around;
  align-items: center;
}

.input-group {
  gap:0.5rem;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
}

input {
  padding:0.25rem;
  width: 100%;
  border-radius: 5px;
  /* line-height: 0; */
  font-size: 1rem;
}

input:target {
  background: var(--color-interactive-passive);
  border: 2px solid var(--color-text-main);
  color: var(--color-text-main);
}

.action-title {
  font-weight: 600;
}

.italic {
  font-style: italic;
}

.number-input {
text-align: center;
}

.slider-input {
  cursor: pointer;
}

/* input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 15rem;
} */

/* input[type="range"]::-webkit-slider-runnable-track {
  background: var(--color-text-main);

  border-radius: 10px;
  border: 2px solid aqua;
  height: 0.5rem;
} */

/******** Firefox ********/
/* input[type="range"]::-moz-range-track {
  background: #ca2222;
  height: 0.5rem;
} */

/* input[type="range"]::-moz-range-thumb {
  background: #ca2222;
  height: 0.5rem;
  border: var(--color-text-main);
} */

button {
  padding: 1rem 1rem;
  /* width: 50%; */
  /* align-self: center; */
  border-radius: 5px;
  font-weight: 600;
  font-size: 1.1em;
  background: var(--color-background-secondary);
  color: var(--color-text-main);
  height:1.3rem;
  line-height: 0;
  border : 2px outset var(--color-text-main);
  /* border: outset; */
}

button:hover {
  cursor: pointer;
  border: 2px inset;
}



</style>