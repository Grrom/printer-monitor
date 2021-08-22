<template>
  <div>
    <div id="details-lister" v-for="(values, key) in detailsList" :key="key">
      <h3>{{ key }}</h3>

      <div v-if="typeof values === 'string'">
        {{ values }}
      </div>

      <div v-else>
        <p v-for="(v, k) in values" :key="k">
          <strong>{{ k }}: </strong>
          <span>{{ v }}</span>
        </p>
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
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/extension";

#details-lister {
  background-color: $white;
  text-align: start;
  padding: 1em;

  @extend .container;
}
</style>
