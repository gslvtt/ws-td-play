<template>
  <form @submit.prevent="createActionHandler">
    <div class="input-group">
          <p class="input-label">Title:</p>
      <input type="text" v-model.trim="title">
    </div>
    <div class="input-group">
      <p class="input-label">Action:</p>
      <input type="text" v-model.trim="actionName">
    </div>
    <div class="input-group">
      <input class="radio-input" type="radio" id="num" value="number" v-model="type">
      <label class="input-label" for="num">Number</label>
      <input class="radio-input" type="radio" id="arr" value="array" v-model="type">
      <label class="input-label" for="arr">Array</label>
      <input class="radio-input" type="radio" id="sli" value="slider" v-model="type">
      <label class="input-label" for="sli">Slider</label>
    </div>
    <div v-if="type === 'slider'" class="input-group">
      <p class="input-label">Range:</p>
      <input type="number" v-model.number="range[0]">
      <input type="number" v-model.number="range[1]">
    </div>
    <button type="submit">Create</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { SetMode } from '../types';

  const props = defineProps<{ setMode : SetMode }>();

  const title = ref<string>('');
  const actionName = ref<string>('');
  const type = ref<string>('number')
  const range = ref<[number, number]>([0,100])

  function createActionHandler () {

    console.log({
      title : title.value,
      actionName: actionName.value,
      type : type.value,
      range : [...range.value],
    });

    title.value = '';
    actionName.value = '';
    type.value = 'number';
    range.value[0] = 0;
    range.value[1] = 100;
    props.setMode('play');
  }

</script>

<style scoped>

.input-label {
  font-weight:600;
}

.radio-input:hover {
  cursor: pointer;
}

.create-button {
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

.create-button:hover {
  cursor: pointer;
  border: 2px inset;
}


</style>