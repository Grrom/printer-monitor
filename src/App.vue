<template>
  <navbar-container></navbar-container>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import NavbarContainer from "./components/nav_bar/navbarContainer.vue";

export default defineComponent({
  components: {
    NavbarContainer,
  },
  setup() {
    onMounted(() => {
      console.log("mounted app");
    });
  },
});
</script>

<style lang="scss">
@import "./styles/mixins";
@import "./styles/variables";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  main {
    padding: 1em;
  }
}

.active-link {
  border-bottom: 2px solid $white;
}
</style>
