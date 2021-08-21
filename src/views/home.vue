<template>
  <div id="home-view">
    <h2>3D Printer Monitoring System</h2>
    <img src="../assets/home-image.png" alt="3d printer image" />
    <h2>Monitor your 3D Printer Remotely</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>

<style lang="scss" scoped>
#home-view {
  text-align: center;
}
</style>
