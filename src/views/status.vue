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

    //const printing = ref(jobStatus.value.state == "printing");

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
        let command: string = printing.value == "Printing" ? "resume" : "pause";

        fetch("http://192.168.43.60/api/job", {
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

        // let formData = new FormData();
        // formData.append("command", "pause");
        // formData.append("action", "toggle");
        // fetch(`${ip}job`, {
        //   method: "POST",
        //   body: formData,
        //   headers: {
        //     "content-type": "application/json",
        //     "X-Api-Key": apiKey,
        //   },
        // })
        //   .then(function (response) {
        //     return response.json();
        //   })
        //   .then(function (data) {
        //     console.log(data);
        //   })
        //   .catch(function (err) {
        //     console.warn("Something went wrong.", err);
        //   });
      } else {
        window.alert("there is no job queued");
      }

      //     fetch("http://192.168.43.60/api/job", {
      //   "headers": {
      //     "accept": "application/json, text/javascript, */*; q=0.01",
      //     "accept-language": "en-US,en;q=0.9",
      //     "cache-control": "no-cache",
      //     "content-type": "application/json; charset=UTF-8",
      //     "x-requested-with": "XMLHttpRequest"
      //   },
      //   "referrerPolicy": "no-referrer",
      //   "body": "{\"action\":\"resume\",\"command\":\"pause\"}",
      //   "method": "POST",
      //   "mode": "cors",
      //   "credentials": "include"
      // });
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
          // console.log(data.progress);

          progressBar.value.style.width = `${formatProgress(
            data.progress.completion
          )}%`;
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    // http://192.168.43.60/api/job
    // POST /api/job HTTP/1.1
    // Host: 192.168.43.60
    // Connection: keep-alive
    // Content-Length: 36
    // Accept: application/json, text/javascript, */*; q=0.01
    // Cache-Control: no-cache
    // X-Requested-With: XMLHttpRequest
    // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36
    // Content-Type: application/json; charset=UTF-8
    // Origin: http://192.168.43.60
    // Accept-Encoding: gzip, deflate
    // Accept-Language: en-US,en;q=0.9
    // Cookie: remember_token_P80=3DPrinting|83bb21da93d57b472552fa503231c3635b8d1f7446d16677b1a5b3d496a8a5f972feafdf91c2d4e9cd83a9e10107d29d4c26f51296b1c17e4d2c0e2e305aaf49; session_P80=.eJxljktqAzEQRO-idQjqbkmtnp3HOYBvMOjTigfMOMxnYUzuHgVvAtlV1aOKepqprbpdzbCvh76Zaa5mME5UvC0Yhbxr5HMBYgsxR0sSbJCamlWJmFPjIgBNW-OWwNfIGTFyJE4ZSwkIAWKlHEgZIAVIvUasyuIUEJsPqdsai-YSnK9VOJl-5Nh0fb2hj8s6L_u8fPZ8rtrl_nhPx36d9seXmmE5brc_5H_pd2vTbZvvy4vKyONZrI_uRO48UpfhxAiM2D0F8_0DMONS7g.YVEsoQ.uLiWev2GkGcFixVeujt_kd5Nmcs

    // fetch("http://192.168.43.60/api/job", {
    //   "headers": {
    //     "accept": "application/json, text/javascript, */*; q=0.01",
    //     "accept-language": "en-US,en;q=0.9",
    //     "cache-control": "no-cache",
    //     "content-type": "application/json; charset=UTF-8",
    //     "x-requested-with": "XMLHttpRequest"
    //   },
    //   "referrerPolicy": "no-referrer",
    //   "body": "{\"action\":\"pause\",\"command\":\"pause\"}",
    //   "method": "POST",
    //   "mode": "cors",
    //   "credentials": "include"
    // });

    //     fetch("http://192.168.43.60/api/job", {
    //   "headers": {
    //     "accept": "application/json, text/javascript, */*; q=0.01",
    //     "accept-language": "en-US,en;q=0.9",
    //     "cache-control": "no-cache",
    //     "content-type": "application/json; charset=UTF-8",
    //     "x-requested-with": "XMLHttpRequest"
    //   },
    //   "referrerPolicy": "no-referrer",
    //   "body": "{\"action\":\"resume\",\"command\":\"pause\"}",
    //   "method": "POST",
    //   "mode": "cors",
    //   "credentials": "include"
    // });
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