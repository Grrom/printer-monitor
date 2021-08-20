<template>
  <div id="nav-items">
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link to="/about" class="nav-item">About</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log("mounted navbar");
    });
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/mixins";
#nav-items {
  .nav-item {
    text-decoration: none;
    color: $white;
    font-weight: bold;
    display: block;

    @include desktop {
      margin: 1em;
    }

    @include mobile {
      margin: 2em 5em;
    }
  }

  @include desktop {
    display: flex;
    justify-content: center;
  }

  @include mobile {
    display: block;
  }
}
</style>