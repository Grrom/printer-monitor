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
        routeName: "/details",
        name: "Printer Details",
      },
      {
        routeName: "/state",
        name: "Printer State",
      },
      {
        routeName: "/status",
        name: "Job Status",
      },
      {
        routeName: "/timelapses",
        name: "Timelapses",
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
  @include desktop {
    display: flex;
    justify-content: center;
  }

  @include mobile {
    display: block;
  }
}
</style>