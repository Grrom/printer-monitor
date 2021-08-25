<template>
  <div id="timelapses-view">
    <!-- <h1>This is the timelapses page</h1>

    <h3>Timelapses</h3>
    <p>
      https://docs.octoprint.org/en/master/api/timelapse.html#
    </p> -->

    <div
      v-for="(timelapse, index) in allTimelapses"
      :key="timelapse.name"
      class="timelapse-container"
      ref="timelapseContainer"
    >
      <div class="details-container">
        <div>
          <h3>{{ timelapse.name }}</h3>
          <p>{{ timelapse.size }}</p>
          <p>{{ timelapse.date }}</p>
        </div>
        <img
          :src="
            timelapse.playing
              ? require('@/assets/close.svg')
              : require('@/assets/play.svg')
          "
          alt="play"
          class="play-button"
          @click="setPlaying(index)"
        />
      </div>
      <video
        v-show="timelapse.playing"
        :src="timelapse.url"
        controls
        class="video-player"
      ></video>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const timelapseContainer = ref();

    const allTimelapses = ref([
      {
        name: "timelapse 01",
        size: "100mb",
        date: new Date().toString(),
        url: require("@/assets/groot.mp4"),
        playing: false,
      },
      {
        name: "timelapse 02",
        size: "100mb",
        date: new Date().toString(),
        url: require("@/assets/groot.mp4"),
        playing: false,
      },
      {
        name: "timelapse 03",
        size: "100mb",
        date: new Date().toString(),
        url: require("@/assets/groot.mp4"),
        playing: false,
      },
    ]);

    function setPlaying(index: number) {
      let isPlaying = allTimelapses.value[index].playing;
      allTimelapses.value[index].playing = !isPlaying;

      let videoPlayer: HTMLVideoElement = document.querySelectorAll(
        ".video-player"
      )[index] as HTMLVideoElement;
      if (isPlaying) {
        videoPlayer.pause();
      } else {
        videoPlayer.play();
      }
    }

    return {
      timelapseContainer,
      allTimelapses,
      setPlaying,
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

      .play-button {
        align-self: center;
        color: $primary;
        width: 3em;
        height: 3em;

        @extend .hover-grow;
        @extend .hover-pointer;
        @extend .active-shrink;
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