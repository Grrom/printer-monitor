<template>
  <router-link
    :to="routeName"
    :class="hasIcon ? 'nav-item has-icon' : 'nav-item'"
  >
    <img :src="icon" v-if="hasIcon" :alt="name" class="icon" />
    <span>{{ name }}</span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    routeName: String,
    icon: String,
    name: String,
  },
  setup(props) {
    const hasIcon = ref(props.icon !== undefined);

    return {
      hasIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "../../styles/extension";
@import "../../styles/hovers";

.nav-item {
  text-decoration: none;
  color: $white;
  font-weight: bold;
  display: block;
  display: flex;
  align-items: center;

  @include desktop {
    margin: 1em;
  }

  @include mobile {
    margin: 2em 5em;
  }

  .icon {
    margin: 0.4em;
    width: 2.5em;
  }
}

.has-icon {
  margin: 1em;
  color: $primary;
  padding: 0.5em;
  font-size: 0.8em;

  @extend .hover-grow;
  @extend .active-shrink;
  @extend .container;
}
</style>
