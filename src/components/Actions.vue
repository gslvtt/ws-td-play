<template>
  <div class="actions-container">
    <template v-for="(action, index) in actions" :key="`$index`">
      <component class="action-content" :is="determineActionComponent(action.type)" :title="action.title" :actionName="action.actionName" :step="action.step" :range="action.range" :index :removeAction :mode></component>
    </template>
    <CreateActionForm class="action-content" v-if="mode === 'add'" :setMode :addAction></CreateActionForm>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { type Mode, type SetMode, type Action } from '../types';
  import CreateActionForm from './CreateActionForm.vue';
  import ActionArray from './ActionArray.vue';
  import ActionNumber from './ActionNumber.vue';
  import ActionSlider from './ActionSlider.vue';
  import ActionText from './ActionText.vue';
  import { getLocalStorage, updateLocalStorage } from '../useLocalStorage';

  // import Form from './Form.vue'
  defineProps<{ setMode : SetMode; mode: Mode}>();

  const actions = ref<Action[]>(getLocalStorage() || []);

  // let result = computed(updateLocalStorage(actions));
  watch(actions.value, updateLocalStorage, { deep: true });

  function addAction (action : Action) :void {
    actions.value.push(action);
  }

  function removeAction (index:number) {
    actions.value.splice(index,1);
    
  }

  function determineActionComponent (type : string) {
    switch (type) {
      case 'number':
        return ActionNumber;
      case 'slider':
        return ActionSlider;
      case 'array':
        return ActionArray;
        case 'text':
        return ActionText;
      default:
        break;
    }
  }

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
  position: relative;
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

input,
textarea {
  padding:0.25rem;
  width: 100%;
  border-radius: 5px;
  /* line-height: 0; */
  font-size: 1rem;
}

input:target,
textarea:target {
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

.text-area-input {
  resize: none;
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

.delete-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: url('../assets/delete.png') no-repeat;
  height:1rem;
  width: 1rem;
  background-size:contain;
}


</style>