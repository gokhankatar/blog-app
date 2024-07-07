<template>
  <v-app-bar class="px-10 py-3 d-flex justify-space-between align-center">
    <div
      @click="_store.activeMyBlogs"
      class="cursor-pointer logo d-flex justify-center align-center ga-2"
    >
      <v-img src="/public/logo.png" width="50" height="50" />
      <span class="d-none d-sm-flex text-subtitle-1 font-weight-bold"> BlogApp</span>
    </div>
    <v-responsive />
    <v-icon
      @click="handleDrawer"
      class="cursor-pointer d-flex d-sm-none"
      :icon="isOpening ? 'mdi-menu' : 'mdi-close'"
      size="x-large"
    />
    <v-list class="d-none d-sm-flex ga-2 align-center">
      <v-list-item
        @click="_store.activeMyBlogs"
        :class="_store.isActive === 'myBlogs' ? 'active' : ''"
        class="list-item cursor-pointer"
        rounded="xl"
      >
        <p class="text-subtitle-2">My Blogs</p>
      </v-list-item>
      <v-list-item
        @click="_store.activeAddBlog"
        :class="_store.isActive === 'addBlog' ? 'active' : ''"
        class="list-item cursor-pointer"
        rounded="xl"
      >
        <p class="text-subtitle-2">Add Blog</p>
      </v-list-item>
      <v-list-item>
        <v-btn
          @click="_store.switchMode"
          color="pink lighten-1"
          variant="outlined"
          rounded="xl"
          :prepend-icon="
            _store.mode === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
        >
          {{ _store.mode === "dark" ? "Ligth Mode" : "Dark Mode" }}
        </v-btn>
      </v-list-item>
    </v-list>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    class="pt-15 px-2 d-flex flex-column align-center ga-5 text-pink-lighten-1"
    permanent
  >
    <div
      @click="_store.activeMyBlogs"
      class="cursor-pointer d-flex justify-center align-center"
    >
      <v-img src="/public/logo.png" width="50" height="50" />
      <span class="text-subtitle-1 font-weight-bold"> BlogApp</span>
    </div>
    <v-responsive height="65%" />
    <v-list class="d-flex flex-column ga-2 align-center">
      <v-list-item
        @click="_store.activeMyBlogs"
        :class="_store.isActive === 'myBlogs' ? 'active' : ''"
        class="list-item cursor-pointer"
        rounded="xl"
      >
        <p class="text-subtitle-2">My Blogs</p>
      </v-list-item>
      <v-list-item
        @click="_store.activeAddBlog"
        :class="_store.isActive === 'addBlog' ? 'active' : ''"
        class="list-item cursor-pointer"
        rounded="xl"
      >
        <p class="text-subtitle-2">Add Blog</p>
      </v-list-item>
      <v-list-item>
        <v-btn
          @click="_store.switchMode"
          color="pink lighten-1"
          variant="outlined"
          rounded="xl"
          :prepend-icon="
            _store.mode === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
        >
          {{ _store.mode === "dark" ? "Ligth Mode" : "Dark Mode" }}
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-container class="mt-15 pa-10">
    <slot />
  </v-container>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "../store/pinia.js";

const _store = store();
const router = useRouter();
const route = useRoute();

const drawer = ref(false);
const isOpening = ref(true);

const handleDrawer = () => {
  drawer.value = !drawer.value;
  isOpening.value = !isOpening.value;
};

onMounted(() => {
  if (route.path === "/") {
    _store.isActive = "myBlogs";
  }
});
</script>

<style scoped>
.list-item {
  transition: all 0.2s ease;
}
.list-item:hover {
  background-color: #ec407a;
  color: #fff;
}
.active {
  background-color: #ec407a;
  color: #fff;
}
</style>
