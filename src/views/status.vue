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
            :class="printing == 'Paused' ? 'pause' : 'resume'"
            @click="togglePrint"
          >
            {{
              printing == "Operational"
                ? "No Job Queued"
                : printing == "Paused"
                ? "resume"
                : printing == "Printing"
                ? "pause"
                : printing
            }}
          </div>
        </div>
      </div>
      <div class="progress-bar">
        <div
          ref="progressBar"
          class="progress"
          :class="printing == 'Paused' ? 'pause' : 'resume'"
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
import {
  formatTime,
  convertBytes,
  getLink,
  formatProgress,
  apiKey,
  ip,
} from "@/helpers/helpers";
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: { detailsLister },
  setup() {
    const progressBar = ref();

    const jobStatus = ref({ job: "", state: "" });

    const printing = computed(() => {
      return jobStatus.value.state;
    });

    const progress = ref({
      completion: null,
      filepos: null,
      printTime: null,
      printTimeLeft: null,
    });

    function togglePrint() {
      if (printing.value == "Paused" || printing.value == "Printing") {
        fetch(ip + "job", {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest",
            "x-api-key": apiKey,
          },
          body: '{"action":"toggle","command":"pause"}',
          method: "POST",
        });
      } else {
        window.alert(
          printing.value == "Pausing"
            ? "Can't issue a command while the printer is Pausing, please wait"
            : "there is no job queued"
        );
      }
    }

    const printTime = computed(() => formatTime(progress.value.printTime));
    const printTimeLeft = computed(() =>
      formatTime(progress.value.printTimeLeft)
    );

    const filePos = computed(() => convertBytes(`${progress.value.filepos}`));

    function requestStatus() {
      fetch(getLink("job"))
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          jobStatus.value["job"] = data.job;
          jobStatus.value["state"] = data.state;
          progress.value = data.progress;

          progressBar.value.style.width = `${formatProgress(
            data.progress.completion
          )}%`;
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    onMounted(() => {
      setInterval(requestStatus, 1000);
      // requestStatus();
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