<template>
  <router-link
    :to="routeName"
    :class="hasIcon ? 'nav-item has-icon' : 'nav-item'"
  >
    <img :src="icon" v-if="hasIcon" :alt="name" class="icon" />
    <span @click="closeNav">{{ name }}</span>
  </router-link>
</template>

<script lang="ts">
import { emitter } from "@/main";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    routeName: String,
    icon: String,
    name: String,
  },
  setup(props) {
    const hasIcon = ref(props.icon !== undefined);

    const closeNav = () => emitter.emit("close-nav");

    return {
      hasIcon,
      closeNav,
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
  display: flex;
  align-items: center;

  @extend .hover-grow;
  @extend .no-select;

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
  background-color: $white;

  @extend .rounded-border;
  @extend .box-shadow;
  @extend .hover-elevate;
}
</style>
