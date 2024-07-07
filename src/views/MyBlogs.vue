<template>
  <v-row class="d-flex justify-center align-center w-100">
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        v-model="models.search"
        type="text"
        label="Search Blog"
        color="pink lighten-1"
        variant="outlined"
        rounded="xl"
      />
    </v-col>
  </v-row>

  <v-row v-if="!isLoading" class="d-flex flex-wrap justify-center align-center ga-2">
    <v-col
      v-for="(item, index) of filteredArr"
      :key="index"
      cols="12"
      sm="12"
      md="4"
      lg="3"
    >
      <v-card
        @click="$router.replace(`/blog/${item.id}`)"
        class="card cursor-pointer pa-5 d-flex flex-column align-start ga-1"
        height="260"
      >
        <v-card-title v-colorful class="text-uppercase text-h5">{{
          item.title
        }}</v-card-title>
        <v-card-text class="subtitle-1">{{ item.author }}</v-card-text>
        <v-card-text class="subtitle-1">{{ snippet(item.content) }}</v-card-text>
        <v-chip class="bg-pink-lighten-1 border-none" variant="outlined">{{
          item.category
        }}</v-chip>
      </v-card>
    </v-col>
  </v-row>

  <!-- loading -->
  <Loading v-if="isLoading" />
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Loading from "../components/Loading.vue";

const blogArr = ref([]);
const isLoading = ref(true);
const models = ref({
  search: "",
});

const getBlogs = async () => {
  try {
    // ! get blogs from database
    isLoading.value = true;
    let url =
      "https://blog-app-4075f-default-rtdb.europe-west1.firebasedatabase.app/post.json";
    const req = await axios.get(url);
    blogArr.value = Object.keys(req.data).map((key) => ({ id: key, ...req.data[key] }));
    isLoading.value = false;
  } catch (error) {
    console.error(error.message);
  }
};

// search blog
const filteredArr = computed(() => {
  const searchTerm = models.value.search.toLowerCase();
  return (filteredArr.value = blogArr.value.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm)
  ));
});

const snippet = (value) => {
  return value.length > 100 ? value + "..." : value;
};

onMounted(() => {
  getBlogs();
});
</script>
<style scoped>
.card {
  box-shadow: 0 0 1.5rem #ec407a;
}
</style>
