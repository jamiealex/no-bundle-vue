
<template>
  <div>
    <h1>Hello {{ name }}</h1>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
export default {
  components: {
    HelloWorld,
  },
  data() {
    return { name: 'Jane Doe' }
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
