<template>
  <div id="navbar-container">
    <div class="desktop-nav">
      <nav-items></nav-items>
    </div>

    <div @click="toggleNavbar" class="hamburger-button">
      <img src="../../assets/hamburger.svg" alt="navbar" />
    </div>
    <div ref="mobileNav" class="mobile-nav">
      <div @click="toggleNavbar" class="hamburger-button">
        <img src="../../assets/hamburger.svg" alt="navbar" />
      </div>
      <nav-items></nav-items>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import navItems from "../nav_bar/navItems.vue";

export default defineComponent({
  components: { navItems },
  name: "navbar-container",
  setup() {
    const mobileNav = ref();

    onMounted(() => {
      console.log("hello world");
    });

    function toggleNavbar() {
      if (mobileNav.value.style.maxWidth == "100vw") {
        mobileNav.value.style.maxWidth = "0px";
      } else {
        mobileNav.value.style.maxWidth = "100vw";
      }
    }

    return {
      toggleNavbar,
      mobileNav,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "../../styles/extension";
@import "../../styles/variables";

#navbar-container {
  .mobile-nav {
    max-width: 0px;
    height: 100vh;
    transition: 0.4s;
    background-color: $primary;
    top: 0;
    left: 0;
    position: fixed;
    overflow: hidden;

    .hamburger-button {
      text-align: end;
    }
  }

  .hamburger-button {
    margin: 1em;
    @include desktop {
      display: none;
    }
  }

  .desktop-nav {
    border-radius: 0 0 50px 50px;
    background-color: $primary;
    margin: auto;
    @extend .box-shadow;
    @include mobile {
      display: none;
    }
  }
}
</style>>