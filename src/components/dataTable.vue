<template>
  <div id="data-table">
    <table class="table br-1">
      <thead>
        <tr>
          <th v-for="(value, key) in tableData[0]" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in tableData" :key="data">
          <td v-for="rowItem in data" :key="rowItem">{{ rowItem }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "dataTable",
  props: {
    tableData: Object,
  },
  setup(props) {
    onMounted(() => {
      console.log(props.tableData);
      console.log("mounted data table");
    });
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/extension";

#data-table {
  @extend .container;
}
</style>