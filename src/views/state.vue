<template>
  <div id="status-view">
    <!-- <h1>This is the state page</h1>

    <h3>printer state</h3>
    <p>
      https://docs.octoprint.org/en/master/api/printer.html#retrieve-the-current-printer-state
    </p> -->

    <details-lister :details-list="state"></details-lister>
    <div class="button" @click="downloadExcel" v-show="hasLogs">
      Download Temperature Logs
    </div>
    <!-- {{ state }} -->
  </div>
</template>

<script lang="ts">
import detailsLister from "@/components/detailsLister.vue";
import { getLink, xlsx } from "@/helpers/helpers";
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";

export default defineComponent({
  components: { detailsLister },
  setup() {
    const state = ref({});

    const temperatureLogs = ref([
      {
        sheet: "Bed",
        columns: [
          { label: "time (HH:MM:SS)", value: "time (HH:MM:SS)" },
          { label: "actual temperature", value: "actual" },
          { label: "temperature offset", value: "offset" },
          { label: "temperature target", value: "target" },
        ],
        content: [] as Array<{
          "time (HH:MM:SS)": string;
          actual: number;
          offset: number;
          target: number;
        }>,
      },
      {
        sheet: "Tool0",
        columns: [
          { label: "time (HH:MM:SS)", value: "time (HH:MM:SS)" },
          { label: "actual temperature", value: "actual" },
          { label: "temperature offset", value: "offset" },
          { label: "temperature target", value: "target" },
        ],
        content: [] as Array<{
          "time (HH:MM:SS)": string;
          actual: number;
          offset: number;
          target: number;
        }>,
      },
    ]);

    const hasLogs = computed(() => temperatureLogs.value[0].content.length > 0);

    function requestState() {
      console.log("requesting state");
      fetch(getLink("printer"))
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          state.value = data;
          let temp = data.temperature;
          let now = new Date();
          let timeNow =
            now.getHours().toString().padStart(2, "0") +
            ":" +
            now.getMinutes().toString().padStart(2, "0") +
            ":" +
            now.getSeconds().toString().padStart(2, "0");

          temperatureLogs.value[0].content.push({
            "time (HH:MM:SS)": timeNow,
            actual: temp.bed.actual,
            offset: temp.bed.offset,
            target: temp.bed.target,
          });
          temperatureLogs.value[1].content.push({
            "time (HH:MM:SS)": timeNow,
            actual: temp.tool0.actual,
            offset: temp.tool0.offset,
            target: temp.tool0.target,
          });
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    function downloadExcel() {
      xlsx(temperatureLogs.value, {
        fileName: "temperature logs - " + new Date().toString(),
      });
    }

    let interval: number | undefined;

    onMounted(() => {
      interval = setInterval(requestState, 1000);
    });

    onBeforeUnmount(() => {
      clearInterval(interval);
    });

    return {
      state,
      hasLogs,
      downloadExcel,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/extension";
@import "../styles/variables";

#status-view {
  text-align: center;

  .button {
    width: 70%;
    margin: 1em auto;
    color: $white;
    font-weight: 700;
    background-color: $primary;

    @extend .rounded-border;
    @extend .box-shadow;
    @extend .hover-elevate;
    @extend .hover-pointer;
  }
}
</style>