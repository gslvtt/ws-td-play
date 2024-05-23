import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App);
// Register a global custom directive called `v-focus`
app.directive('focus', {
  // When the bound element is mounted into the DOM...
  mounted(el) {
    // Focus the element
    el.focus()
  }
})

app.mount('#app');
