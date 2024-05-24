<template>
  <form @submit.prevent="createActionHandler">
    <div class="input-group">
          <p class="input-label">Title:</p>
      <input type="text" v-model.trim="title" v-focus required>
    </div>
    <div class="input-group">
      <p class="input-label">Action:</p>
      <input type="text" v-model.trim="actionName" pattern="[a-zA-Z_]+" title="[a-zA-Z_]+" placeholder="ex. lightOne or light_one"required>
    </div>
    <div class="input-group">
      <input class="radio-input" name="type" type="radio" id="num" value="number" v-model="type" required>
      <label class="input-label" for="num">Number</label>
      <input class="radio-input" name="type" type="radio" id="arr" value="array" v-model="type" required>
      <label class="input-label" for="arr">Array</label>
      <input class="radio-input" name="type" type="radio" id="sli" value="slider" @click="()=>rangeApplied=true" v-model="type" required>
      <label class="input-label" for="sli">Slider</label>
      <input class="radio-input" name="type" type="radio" id="tex" value="text" v-model="type" required>
      <label class="input-label" for="tex">Text</label>
    </div>
    <div class="input-group">
      <p class="input-label" style="min-width: 5rem;">Step (10<sup>x</sup>):</p>     
      <input class="number-input" type="number" placeholder="x" step="1" v-model.number="stepInput" :disabled="type === 'text'" required>
    </div>
    <div class="input-group">
      <input type="checkbox" v-model="rangeApplied" :disabled="type === 'text'" :required="type==='slider'">
      <p class="input-label">Range:</p>
      <input class="number-input" type="number" placeholder="Min" :disabled="!rangeApplied || type === 'text'" :step="computedStep" v-model.number="range[0]" :required="rangeApplied">
      <input class="number-input" type="number" placeholder="Max" :disabled="!rangeApplied || type === 'text'" :step="computedStep" v-model.number="range[1]" :required="rangeApplied">
    </div>
    <button type="submit">Create</button>
  </form>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Action, ActionType, SetMode } from '../types';

  const props = defineProps<{ setMode : SetMode, addAction : (action : Action) => void }>();

  const title = ref<string>('');
  const actionName = ref<string>('');
  const type = ref<string>('');
  const range = ref<[number, number] | [string, string]>(['','']);
  const stepInput = ref<number | string>('');
  const computedStep = computed(() => Math.pow(10, stepInput.value as number) || 1);
  const rangeApplied = ref<boolean>(false);


  function validateRangeMinMax (range : [number, number]) {
    const minMax = range[0] <= range[1];
    if (!minMax) alert('Minimum must be lower than the maximum.');
    return minMax;
  }

  function validateRange (actionModel : {title : string, actionName : string, type : string, step: number, range? : [number, number]}) {
    if (rangeApplied.value) {
      const validated = validateRangeMinMax(range.value as [number, number]);
      if (validated) {
        actionModel.range = [...range.value] as [number, number];
      } else {
        return false;
      }
    }
    return true;
  }

  function resetFormValues () {
    title.value = '';
    actionName.value = '';
    type.value = '';
    stepInput.value = '';
    range.value[0] = 0;
    range.value[1] = 100;
    rangeApplied.value= false;
  }

  function formatActionData() {
    const actionData : Action = {
      title : title.value,
      actionName: actionName.value,
      type : type.value as ActionType,
      step : computedStep.value
    }
    if (!validateRange(actionData)) return null;
    else return actionData;
  }

  function createActionHandler () {
    const action : Action | null = formatActionData()

    if (action !== null) {
      resetFormValues();
      props.addAction(action);
      props.setMode('play');
    }
  }

</script>

<style scoped>

.input-label {
  font-weight:600;
}

.radio-input:hover {
  cursor: pointer;
}

</style>