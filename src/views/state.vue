<template>
  <div id="status-view">
    <h1>This is the state page</h1>

    <h3>printer state</h3>
    <p>
      https://docs.octoprint.org/en/master/api/printer.html#retrieve-the-current-printer-state
    </p>
    {{ state }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const state = ref({
      temperature: {
        tool0: {
          actual: 214.8821,
          target: 220.0,
          offset: 0,
        },
        tool1: {
          actual: 25.3,
          target: null,
          offset: 0,
        },
        bed: {
          actual: 50.221,
          target: 70.0,
          offset: 5,
        },
        history: [
          {
            time: 1395651928,
            tool0: {
              actual: 214.8821,
              target: 220.0,
            },
            tool1: {
              actual: 25.3,
              target: null,
            },
            bed: {
              actual: 50.221,
              target: 70.0,
            },
          },
          {
            time: 1395651926,
            tool0: {
              actual: 212.32,
              target: 220.0,
            },
            tool1: {
              actual: 25.1,
              target: null,
            },
            bed: {
              actual: 49.1123,
              target: 70.0,
            },
          },
        ],
      },
      sd: {
        ready: true,
      },
      state: {
        text: "Operational",
        flags: {
          operational: true,
          paused: false,
          printing: false,
          cancelling: false,
          pausing: false,
          sdReady: true,
          error: false,
          ready: true,
          closedOrError: false,
        },
      },
    });

    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
#status-view {
  text-align: center;
}
</style>