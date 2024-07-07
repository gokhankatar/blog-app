<template>
  <div v-if="!isLoading" class="wrapper my-15 d-flex flex-column ga-5">
    <h3 class="text-h5 text-center text-uppercase text-sm-h4 text-sm-start text-md-h3">
      Blog Detail
    </h3>
    <v-card class="card cursor-pointer pa-5 d-flex flex-column align-start ga-3">
      <v-card-title v-colorful class="text-uppercase text-h5">{{
        blog.title
      }}</v-card-title>
      <v-card-text class="subtitle-1">{{ blog.author }}</v-card-text>
      <v-card-text class="subtitle-1">{{ blog.content }}</v-card-text>
      <v-chip class="bg-pink-lighten-1 border-none" variant="outlined">{{
        blog.category
      }}</v-chip>
    </v-card>
  </div>

  <!-- loading -->
  <Loading v-if="isLoading" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Loading from "../components/Loading.vue";

const route = useRoute();
const isLoading = ref(false);
const blog = ref({
  title: "",
  author: "",
  content: "",
  category: "",
});
const id = route.params.id;

const getBlogById = async (id) => {
  try {
    isLoading.value = true;
    let url = `https://blog-app-4075f-default-rtdb.europe-west1.firebasedatabase.app/post/${id}.json`;
    const req = await axios.get(url);
    blog.value.title = req.data.title;
    blog.value.author = req.data.author;
    blog.value.content = req.data.content;
    blog.value.category = req.data.category;
    isLoading.value = false;
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(() => {
  getBlogById(id);
});
</script>
<style scoped>
.card {
  box-shadow: 0 0 1.5rem #ec407a;
}
</style>
