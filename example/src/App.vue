
<template>
  <div>
    <header>
      <h1>Hello {{ username }}</h1>
    </header>
    <div class="content">
      <Username
        :username="username"
        @update:username="onUpdateUsername"
      />
    </div>
  </div>
</template>

<script>
import Username from './components/Username.vue';

export default {
  components: {
    Username,
  },
  data() {
    return {
      username: 'No Bundle Vue',
    };
  },
  methods: {
    onUpdateUsername (username) {
      this.username = username;
    },
  },
}
</script>

<style scoped>
header {
  width: 100vw;
  padding: var(--spacing);
  background-color: #637cda;
  padding-bottom: var(--spacing);

}

header h1 {
  color: #ffffff;
}

.content {
  padding: var(--spacing);
}
</style>
