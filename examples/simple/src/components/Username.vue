<template>
  <div class="username">
    <input type="text" :value="username" @input="onUsernameInput" />
  </div>
</template>

<script lang="ts">
import { get } from '/web_modules/lodash-es.js';

export default {
  created() {
    (async function() {
      await import('/web_modules/lodash-es.js');
      await import('../something.js');
    })();
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

<style scoped lang="postcss">
.username {
  & input {
    padding: calc(var(--spacing) / 6);
    border-radius: 0.3rem;
  }
}
</style>
