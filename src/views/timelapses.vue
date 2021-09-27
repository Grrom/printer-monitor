<template>
  <div id="timelapses-view">
    <!-- <h1>This is the timelapses page</h1>

    <h3>Timelapses</h3>
    <p>
      https://docs.octoprint.org/en/master/api/timelapse.html#
    </p> -->

    <div
      v-for="timelapse in allTimelapses"
      :key="timelapse.name"
      class="timelapse-container"
    >
      <div class="details-container">
        <div>
          <h3>{{ timelapse.name }}</h3>
          <p>{{ timelapse.size }}</p>
          <p>{{ timelapse.date }}</p>
        </div>
        <div class="icon-button-container">
          <a :href="timelapse.url" download target="_blank">
            <img
              src="@/assets/download.svg"
              alt="download"
              class="icon-button"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const allTimelapses = ref([{}]);

    function requestTimelapses() {
      fetch(
        "http://192.168.43.60/api/timelapse?apikey=D299AAAE1A294A458D3846FE33A48AC0"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          allTimelapses.value.pop();
          data.files.forEach(
            (timelapse: {
              name: string;
              size: number;
              date: number;
              url: string;
            }) => {
              allTimelapses.value.push({
                name: timelapse.name,
                size: timelapse.size,
                date: timelapse.date,
                url: `http://192.168.43.60${timelapse.url}`,
              });
            }
          );
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    onMounted(() => {
      requestTimelapses();
    });

    return {
      allTimelapses,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/extension";
@import "../styles/hovers";
@import "../styles/variables";

#timelapses-view {
  text-align: center;

  .timelapse-container {
    text-align: start;

    @extend .container;

    .details-container {
      display: flex;
      justify-content: space-between;

      @extend .default-padding;

      .icon-button-container {
        align-self: center;

        .icon-button {
          color: $primary;
          width: 3em;
          height: 3em;

          @extend .default-margin;
          @extend .hover-grow;
          @extend .hover-pointer;
        }
      }
    }

    .video-player {
      width: 95%;
      display: block;
      margin: 1.5em auto;

      @extend .rounded-border;
    }
  }
}
</style>