<template>
  <div id="status-view">
    <!-- <h1>This is the status page</h1>

    <h3>Job Status</h3>
    <p>
      https://docs.octoprint.org/en/master/api/job.html#retrieve-information-about-the-current-job
    </p> -->
    <div class="progress-container">
      <div class="progress-controls">
        <div>
          <p>
            <strong>File Position:</strong>
            {{ filePos }}
          </p>
          <p>
            <strong>Print time:</strong>
            {{ printTime }}
          </p>
          <p>
            <strong>Print time left:</strong>
            {{ printTimeLeft }}
          </p>
        </div>
        <div>
          <div
            class="resume button"
            :class="printing ? 'pause' : 'resume'"
            @click="togglePrint"
          >
            {{ printing ? "pause" : "resume" }}
          </div>
        </div>
      </div>
      <div class="progress-bar">
        <div
          ref="progressBar"
          class="progress"
          :class="printing ? 'resume' : 'pause'"
        >
          <strong
            >{{ Math.round(progress.completion * 100 * 100) / 100 }}%
          </strong>
        </div>
      </div>
    </div>

    <details-lister :details-list="jobStatus"></details-lister>
  </div>
</template>

<script lang="ts">
import detailsLister from "@/components/detailsLister.vue";
import { formatDate, formatTime, convertBytes } from "@/helpers/helpers";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  components: { detailsLister },
  setup() {
    const progressBar = ref();
    const printing = ref(true);

    let timerInstance = setInterval(timer, 1000);

    const jobStatus = ref({
      job: {
        file: {
          name: "whistle_v2.gcode",
          origin: "local",
          size: 1468987,
          date: formatDate(1378847754).toString(),
        },
        estimatedPrintTime: 8811,
        filament: {
          tool0: {
            length: 810,
            volume: 5.36,
          },
        },
      },
      state: "Printing",
    });

    const progress = ref({
      completion: 0.2298468264184775,
      filepos: 337942,
      printTime: 276,
      printTimeLeft: 912,
    });

    function timer() {
      progress.value.filepos += 1000;

      progress.value.printTime += 1;
      progress.value.printTimeLeft -= 1;

      progress.value.completion += 0.001;
      progressBar.value.style.width = `${
        Math.round(progress.value.completion * 100 * 100) / 100
      }%`;
    }

    function togglePrint() {
      if (printing.value) {
        clearInterval(timerInstance);
      } else {
        timerInstance = setInterval(timer, 1000);
      }
      printing.value = !printing.value;
    }

    const printTime = computed(() => formatTime(progress.value.printTime));
    const printTimeLeft = computed(() =>
      formatTime(progress.value.printTimeLeft)
    );
    const filePos = computed(() =>
      convertBytes(progress.value.filepos.toString())
    );

    return {
      jobStatus,
      progress,
      progressBar,
      printing,
      printTime,
      printTimeLeft,
      filePos,
      togglePrint,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/extension";
@import "../styles/variables";

#status-view {
  text-align: center;

  .progress-container {
    @extend .container;

    .progress-controls {
      display: flex;
      align-items: center;

      * {
        flex: 1;
      }
    }

    .progress-bar {
      height: 2em;
      background-color: $blackLight;
      position: relative;

      @extend .rounded-border;
      @extend .default-margin;

      .progress {
        transition: 1s;
        opacity: 1;
        width: 0%;
        height: 100%;
        color: $white;
        font-size: 0.6em;
        position: absolute;
        top: 0;
        left: 0;
        background-color: $primary;
        border-radius: inherit;
      }

      .resume {
        background-color: $primary;
      }

      .pause {
        background-color: $secondary;
      }
    }

    .button {
      width: 70%;
      margin: 1em auto;
      color: $white;
      font-weight: 700;

      @extend .rounded-border;
      @extend .box-shadow;
      @extend .hover-elevate;
      @extend .hover-pointer;
    }

    .resume {
      background-color: $primary;
    }

    .pause {
      background-color: $secondary;
    }
  }
}
</style>