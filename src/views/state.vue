<template>
  <div id="status-view">
    <!-- <h1>This is the state page</h1>

    <h3>printer state</h3>
    <p>
      https://docs.octoprint.org/en/master/api/printer.html#retrieve-the-current-printer-state
    </p> -->

    <details-lister :details-list="state"></details-lister>
    <!-- {{ state }} -->
  </div>
</template>

<script lang="ts">
import detailsLister from "@/components/detailsLister.vue";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: { detailsLister },
  setup() {
    const state = ref({});

    function requestState() {
      fetch(
        "http://192.168.43.60/api/printer?apikey=D299AAAE1A294A458D3846FE33A48AC0"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          state.value = data;
        })

        .catch((error) => {
          console.warn(error);
        });
    }

    onMounted(() => {
      requestState();
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