<template>
  <div id="lister-parent">
    <div
      :id="nested ? 'details-lister-nested' : 'details-lister'"
      v-for="(values, key) in detailsList"
      :key="key"
    >
      <div v-if="typeof values === 'string' || typeof values === 'number'">
        <strong>{{ key }}: </strong>
        <span>{{ values }}</span>
      </div>

      <div v-else>
        <span v-if="nested">{{ key }}</span>
        <h3 v-else>{{ key }}</h3>

        <div v-for="(v, k) in values" :key="k">
          <strong>{{ k }}: </strong>

          <span v-if="Array.isArray(v)">
            <span v-for="item in v" :key="item">
              <span v-if="typeof item === 'string' || typeof item === 'number'"
                >{{ item.toString() }},
              </span>
              <span v-else-if="typeof item === 'object'"
                ><details-lister
                  :details-list="item"
                  :nested="true"
                ></details-lister
              ></span>
              <span v-else>something went wrong</span>
            </span>
          </span>

          <div v-else-if="typeof v === 'object' && !Array.isArray(v)">
            <details-lister :details-list="v" :nested="true"></details-lister>
          </div>
          <span v-else>{{ v }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "detailsLister",
  props: {
    detailsList: Object,
    nested: Boolean,
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/extension";
#lister-parent {
  display: flex;
  flex-wrap: wrap;

  #details-lister {
    text-align: start;
    padding: 3em;
    flex: 1;
    @extend .container;
  }

  #details-lister-nested {
    margin-left: 2em;
    @extend .border-bottom;
  }
}
</style>
