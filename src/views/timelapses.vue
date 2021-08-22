<template>
  <div id="timelapses-view">
    <!-- <h1>This is the timelapses page</h1>

    <h3>Timelapses</h3>
    <p>
      https://docs.octoprint.org/en/master/api/files.html#retrieve-all-files
    </p> -->

    <details-lister :details-list="allFiles"></details-lister>

    <!-- {{ allFiles }} -->
  </div>
</template>

<script lang="ts">
import detailsLister from "@/components/detailsLister.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { detailsLister },
  setup() {
    const allFiles = ref({
      files: [
        {
          name: "whistle_v2.gcode",
          path: "whistle_v2.gcode",
          type: "machinecode",
          typePath: ["machinecode", "gcode"],
          hash: "...",
          size: 1468987,
          date: 1378847754,
          origin: "local",
          refs: {
            resource: "http://example.com/api/files/local/whistle_v2.gcode",
            download:
              "http://example.com/downloads/files/local/whistle_v2.gcode",
          },
          gcodeAnalysis: {
            estimatedPrintTime: 1188,
            filament: {
              length: 810,
              volume: 5.36,
            },
          },
          print: {
            failure: 4,
            success: 23,
            last: {
              date: 1387144346,
              success: true,
            },
          },
        },
        {
          name: "whistle_.gco",
          path: "whistle_.gco",
          type: "machinecode",
          typePath: ["machinecode", "gcode"],
          origin: "sdcard",
          refs: {
            resource: "http://example.com/api/files/sdcard/whistle_.gco",
          },
        },
        {
          name: "folderA",
          path: "folderA",
          type: "folder",
          typePath: ["folder"],
          children: [
            {
              name: "whistle_v2_copy.gcode",
              path: "whistle_v2_copy.gcode",
              type: "machinecode",
              typePath: ["machinecode", "gcode"],
              hash: "...",
              size: 1468987,
              date: 1378847754,
              origin: "local",
              refs: {
                resource:
                  "http://example.com/api/files/local/folderA/whistle_v2_copy.gcode",
                download:
                  "http://example.com/downloads/files/local/folderA/whistle_v2_copy.gcode",
              },
              gcodeAnalysis: {
                estimatedPrintTime: 1188,
                filament: {
                  length: 810,
                  volume: 5.36,
                },
              },
              print: {
                failure: 4,
                success: 23,
                last: {
                  date: 1387144346,
                  success: true,
                },
              },
            },
          ],
        },
      ],
      free: "3.2GB",
    });

    return {
      allFiles,
    };
  },
});
</script>
<style lang="scss" scoped>
#timelapses-view {
  text-align: center;
}
</style>