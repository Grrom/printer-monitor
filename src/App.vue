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

body {
  background-color: $bg;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 2em;

  @include desktop {
    width: 70vw;
    margin: auto;
    min-width: $desktop;
  }

  main {
    padding: 1em;
  }
}

.active-link {
  border-bottom: 2px solid $white;
}
</style>
