<template>
  <div id="details-view">
    <!-- <h1>This is the details page</h1>

    <h3>Connection Details</h3>
    <p>https://docs.octoprint.org/en/master/api/connection.html</p> -->

    <div class="printer-container">
      <img src="@/assets/printer.jpg" alt="printer" class="printer" />
      <div class="resume button">resume</div>
      <div class="pause button">pause</div>
      <div class="stop button">stop</div>
    </div>

    <details-lister :details-list="connectionDetails"></details-lister>

    <!-- {{ connectionDetails }} -->
  </div>
</template>

<script lang="ts">
import DetailsLister from "@/components/detailsLister.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { DetailsLister },
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

  .printer-container {
    padding: 1em;

    @extend .container;

    .printer {
      max-width: 400px;
      width: 90%;

      @extend .rounded-border;
    }

    .button {
      width: 70%;
      margin: 1em auto;
      color: $white;
      font-weight: 700;

      @extend .rounded-border;
      @extend .box-shadow;
      @extend .hover-grow;
      @extend .active-shrink;
      @extend .hover-pointer;
    }

    .resume {
      background-color: $primary;
    }

    .pause {
      background-color: $orange;
    }

    .stop {
      background-color: $secondary;
    }
  }
}
</style>