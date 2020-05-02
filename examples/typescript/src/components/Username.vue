<template>
  <div class="username">
    <input type="text" :value="username" @input="onUsernameInput" />
  </div>
</template>

<script lang="ts">
import { get } from '/web_modules/lodash-es.js';

export default {
  created(): void {
    const something: boolean = true;
    (async function() {
      await import('/web_modules/lodash-es.js');
      await import('../something.js');
    })();
    console.log(get);
  },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  methods: {
    onUsernameInput(event) {
      this.$emit('update:username', event.target.value);
    },
  },
};
</script>