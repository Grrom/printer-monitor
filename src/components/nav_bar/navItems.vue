<template>
  <div id="nav-items">
    <nav-item
      v-for="navItem in navItems"
      :routeName="navItem.routeName"
      :iconName="navItem.iconName"
      :name="navItem.name"
      :key="navItem.name"
      class="nav-item"
    ></nav-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import navItem from "./navItem.vue";

export default defineComponent({
  components: {
    navItem,
  },
  setup() {
    const navItems = ref([
      {
        routeName: "/",
        name: "Home",
      },
      {
        routeName: "/gas",
        name: "Gas",
      },
      {
        routeName: "/light",
        name: "Light",
      },
      {
        routeName: "/liveFeed",
        name: "Live Feed",
      },
      {
        routeName: "/photoResistor",
        name: "Photo Resistor",
      },
      {
        routeName: "/sound",
        name: "Sound",
      },
    ]);

    onMounted(() => {
      console.log("mounted navbar");
    });

    return {
      navItems,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables";
@import "../../styles/mixins";
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