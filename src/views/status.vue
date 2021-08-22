<template>
  <div id="status-view">
    <!-- <h1>This is the status page</h1>

    <h3>Job Status</h3>
    <p>
      https://docs.octoprint.org/en/master/api/job.html#retrieve-information-about-the-current-job
    </p> -->

    <details-lister :details-list="jobStatus"></details-lister>

    <!-- {{ jobStatus }} -->
  </div>
</template>

<script lang="ts">
import detailsLister from "@/components/detailsLister.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { detailsLister },
  setup() {
    const jobStatus = ref({
      job: {
        file: {
          name: "whistle_v2.gcode",
          origin: "local",
          size: 1468987,
          date: 1378847754,
        },
        estimatedPrintTime: 8811,
        filament: {
          tool0: {
            length: 810,
            volume: 5.36,
          },
        },
      },
      progress: {
        completion: 0.2298468264184775,
        filepos: 337942,
        printTime: 276,
        printTimeLeft: 912,
      },
      state: "Printing",
    });

    return {
      jobStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
#status-view {
  text-align: center;
}
</style>