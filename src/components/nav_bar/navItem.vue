<template>
  <router-link :to="routeName" class="nav-item">
    {{ name }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    routeName: String,
    iconName: String,
    name: String,
  },
});
</script>
