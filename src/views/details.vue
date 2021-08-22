<template>
  <div id="details-view">
    <h1>This is the details page</h1>

    <h3>Connection Details</h3>
    <p>https://docs.octoprint.org/en/master/api/connection.html</p>

    {{ connectionDetails }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const connectionDetails = ref({
      current: {
        state: "operational",
        port: "/dev/ttyacm0",
        baudrate: 250000,
        printerprofile: "_default",
      },
      options: {
        ports: ["/dev/ttyacm0", "virtual"],
        baudrates: [250000, 230400, 115200, 57600, 38400, 19200, 9600],
        printerprofiles: [{ name: "default", id: "_default" }],
        portpreference: "/dev/ttyacm0",
        baudratepreference: 250000,
        printerprofilepreference: "_default",
        autoconnect: true,
      },
    });

    return {
      connectionDetails,
    };
  },
});
</script>

<style lang="scss" scoped>
#details-view {
  text-align: center;
}
</style>