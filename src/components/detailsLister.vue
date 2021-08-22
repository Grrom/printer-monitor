<template>
  <div>
    <div id="details-lister" v-for="(values, key) in detailsList" :key="key">
      <h3>{{ key }}</h3>

      <div v-if="typeof values === 'string' || typeof values === 'number'">
        {{ values }}
      </div>

      <div v-else>
        <div v-for="(v, k) in values" :key="k">
          <!-- <div v-if="typeof v === 'object'">
            <details-lister :details-list="v"></details-lister>
          </div> -->

          <div>
            <strong>{{ k }}: </strong>

            <span v-if="Array.isArray(v)">
              <span v-for="item in v" :key="item">
                <span
                  v-if="typeof item === 'string' || typeof item === 'number'"
                  >{{ item.toString() }},
                </span>
                <span v-else>mali</span>
              </span>
            </span>
            <span v-else>{{ v }}</span>
          </div>
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
