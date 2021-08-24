<template>
  <div id="home-view">
    <h2>3D Printer Monitoring System</h2>
    <img src="../assets/home-image.png" alt="3d printer image" />
    <h2>Monitor your 3D Printer Remotely</h2>

    <div class="icons-grid">
      <nav-item
        v-for="route in routes"
        :route-name="route.routeName"
        :name="route.name"
        :icon="route.icon"
        :key="route.name"
      ></nav-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import navItem from "@/components/nav_bar/navItem.vue";

export default defineComponent({
  name: "Home",
  components: {
    navItem,
  },
  setup() {
    const routes = ref([
      {
        name: "Printer Details",
        routeName: "/details",
        icon: require("@/assets/details.png"),
      },
      {
        name: "Printer State",
        routeName: "/state",
        icon: require("@/assets/state.png"),
      },
      {
        name: "Job Status",
        routeName: "/status",
        icon: require("@/assets/jobstatus.png"),
      },
      {
        name: "Timelapses",
        routeName: "/timelapses",
        icon: require("@/assets/timelapse.png"),
      },
    ]);

    return {
      routes,
    };
  },
});
</script>

<style lang="scss" scoped>
#home-view {
  text-align: center;

  .icons-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
