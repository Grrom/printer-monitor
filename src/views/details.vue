<template>
  <div id="details-view">
    <!-- <h1>This is the details page</h1>

    <h3>Connection Details</h3>
    <p>https://docs.octoprint.org/en/master/api/connection.html</p> -->

    <details-lister :details-list="connectionDetails"></details-lister>

    <!-- {{ connectionDetails }} -->
  </div>
</template>

<script lang="ts">
import DetailsLister from "@/components/detailsLister.vue";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: { DetailsLister },
  setup() {
    const connectionDetails = ref({});

    function requestState() {
      fetch(
        "http://192.168.43.60/api/connection?apikey=D299AAAE1A294A458D3846FE33A48AC0"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          connectionDetails.value = data;
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    onMounted(() => {
      requestState();
    });

    return {
      connectionDetails,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/extension";
@import "../styles/mixins";
@import "../styles/hovers";

#details-view {
  text-align: center;

  @include desktop {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
  }
}
</style>