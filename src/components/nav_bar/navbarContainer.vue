<template>
  <div id="navbar-container">
    <div class="desktop-nav">
      <nav-items></nav-items>
    </div>

    <img
      src="../../assets/hamburger.svg"
      alt="navbar"
      @click="toggleNavbar"
      class="hamburger-button"
    />
    <div ref="mobileNav" class="mobile-nav">
      <div class="hamburger-button-container">
        <img
          src="../../assets/hamburger.svg"
          alt="navbar"
          @click="toggleNavbar"
          class="hamburger-button"
        />
      </div>
      <nav-items></nav-items>
    </div>
  </div>
  <div ref="overlay" class="overlay" @click="toggleNavbar('close')"></div>
</template>

<script lang="ts">
import { emitter } from "@/main";
import { defineComponent, onMounted, ref } from "vue";
import navItems from "../nav_bar/navItems.vue";

export default defineComponent({
  components: { navItems },
  name: "navbar-container",
  setup() {
    const mobileNav = ref();
    const overlay = ref();

    function toggleNavbar(action: "close" | "open") {
      if (mobileNav.value.style.maxWidth == "100vw" || action === "close") {
        mobileNav.value.style.maxWidth = "0px";
        overlay.value.style.display = "none";
      } else {
        mobileNav.value.style.maxWidth = "100vw";
        overlay.value.style.display = "block";
      }
    }

    onMounted(() => {
      emitter.on("close-nav", () => {
        console.log("close requested");
        toggleNavbar("close");
      });
    });

    return {
      toggleNavbar,
      mobileNav,
      overlay,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "../../styles/extension";
@import "../../styles/variables";

#navbar-container {
  position: sticky;
  z-index: 10;
  top: 0;

  @include mobile {
    display: flex;
    background-color: $primary;
  }

  .hamburger-button {
    width: 2em;
    height: 2em;
  }

  .mobile-nav {
    max-width: 0px;
    height: 100vh;
    transition: 0.2s;
    background-color: $primary;
    top: 0;
    left: 0;
    position: fixed;
    overflow: hidden;
    z-index: 2;

    .hamburger-button-container {
      text-align: end;
    }
  }

  .hamburger-button {
    align-self: center;
    margin: 1em;

    @include desktop {
      display: none;
    }
  }

  .desktop-nav {
    border-radius: 0 0 50px 50px;
    background-color: $primary;
    margin: auto;
    padding: 0 2em;

    @extend .box-shadow;
    @include mobile {
      display: none;
    }
  }

  @extend .hover-grow-subtle;
}

.overlay {
  position: fixed;
  display: none;
  top: 0;
  z-index: 1;
  background-color: $blackLight;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
}
</style>>