<template>
  <v-app :theme="_store.mode">
    <v-container>
      <component :is="$route.meta.layout">
        <router-view />
      </component>
    </v-container>
  </v-app>
</template>

<script setup>
import store from "./store/pinia";
const _store = store();
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
