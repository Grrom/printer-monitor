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
          <strong>{{ formatProgress(progress.completion) }}% </strong>
        </div>
      </div>
    </div>

    <details-lister :details-list="jobStatus"></details-lister>
  </div>
</template>

<script lang="ts">
import detailsLister from "@/components/detailsLister.vue";
import { formatTime, convertBytes, formatProgress } from "@/helpers/helpers";
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: { detailsLister },
  setup() {
    const progressBar = ref();
    const printing = ref(true);

    const jobStatus = ref({ job: "", state: "" });

    const progress = ref({
      completion: null,
      filepos: null,
      printTime: null,
      printTimeLeft: null,
    });

    function togglePrint() {
      printing.value = !printing.value;
    }

    const printTime = computed(() => formatTime(progress.value.printTime));
    const printTimeLeft = computed(() =>
      formatTime(progress.value.printTimeLeft)
    );
    const filePos = computed(() => convertBytes(`${progress.value.filepos}`));

    function requestStatus() {
      fetch(
        "http://192.168.43.60/api/job?apikey=D299AAAE1A294A458D3846FE33A48AC0"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          jobStatus.value["job"] = data.job;
          jobStatus.value["state"] = data.state;
          progress.value = data.progress;
          console.log(data.progress);

          progressBar.value.style.width = `${formatProgress(
            data.progress.completion
          )}%`;
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    onMounted(() => {
      // setInterval(requestStatus, 1000);
      requestStatus();
    });

    return {
      jobStatus,
      progress,
      progressBar,
      printing,
      printTime,
      printTimeLeft,
      filePos,
      formatProgress,
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