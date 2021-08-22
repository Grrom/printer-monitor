<template>
  <div>
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
        <h3>{{ key }}</h3>
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
                <span v-else-if="typeof item === 'object'"
                  ><details-lister
                    :details-list="item"
                    nested="true"
                  ></details-lister
                ></span>
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
    nested: Boolean,
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

#details-lister-nested {
  margin-left: 2em;
  @extend .border-bottom;
}
</style>
