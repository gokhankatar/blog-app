<template>
  <div class="wrapper d-flex flex-column ga-5">
    <h2 class="text-h5 text-center text-md-start text-md-h3">Add New Blog</h2>
    <v-form class="d-flex flex-column ga-2" ref="formRef" @submit.prevent="validate">
      <v-text-field
        v-model="models.title"
        :rules="modelRules.title"
        type="text"
        label="Title"
        color="pink lighten-1"
        variant="outlined"
        rounded="xl"
        clearable
      />
      <v-text-field
        v-model="models.author"
        :rules="modelRules.author"
        type="text"
        label="Auhtor"
        color="pink lighten-1"
        variant="outlined"
        rounded="xl"
        clearable
      />
      <v-select
        v-model="models.category"
        :items="categories"
        :rules="modelRules.categories"
        label="Category"
        color="pink lighten-1"
        variant="outlined"
        rounded="xl"
        required
      ></v-select>

      <v-textarea
        v-model="models.content"
        :rules="modelRules.content"
        type="text"
        label="Content"
        placeholder="Write Somethings..."
        color="pink lighten-1"
        variant="outlined"
        rounded="xl"
        counter="250"
        no-resize
        clearable
      />

      <v-btn type="submit" color="pink-lighten-1" rounded="xl" block>Add</v-btn>
    </v-form>
    <div class="preview d-flex flex-column ga-5 my-10 pa-5">
      <h4 class="text-h5">Preview</h4>
      <v-divider />
      <p class="text-subtitle-1">
        Title : <span class="text-subtitle-2 font-weight-bold">{{ models.title }}</span>
      </p>
      <p class="text-subtitle-1">
        Author :
        <span class="text-subtitle-2 font-weight-bold">{{ models.author }}</span>
      </p>
      <p class="text-subtitle-1">
        Category :
        <span class="text-subtitle-2 font-weight-bold">{{ models.category }}</span>
      </p>
      <p class="text-subtitle-1">
        Content :
        <span class="text-subtitle-2 font-weight-bold">{{ models.content }}</span>
      </p>
    </div>
  </div>

  <!-- toast -->
  <v-snackbar :color="info.color" v-model="isAddedBlog">{{ info.msg }}</v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const formRef = ref(null);
const models = ref({
  title: "",
  author: "",
  category: "",
  content: "",
});
const modelRules = ref({
  title: [
    (v) => !!v || "Title is required!",
    (v) => (v && v.length > 3) || "Your blog title must be longer than 3",
  ],
  author: [
    (v) => !!v || "Auhtor is required!",
    (v) => (v && v.length > 3) || "Author must be longer than 3",
  ],
  categories: [(v) => !!v || "Category is required!"],
  content: [
    (v) => !!v || "Title is required!",
    (v) => (v && v.length > 15) || "Your blog title must be longer than 15",
  ],
});
const categories = ["Software", "Life", "Technology", "Economy", "Other"];
const isAddedBlog = ref(false);
const info = ref({
  msg: "",
  color: "",
});

const addPost = async () => {
  try {
    // ! sending to database
    let url =
      "https://blog-app-4075f-default-rtdb.europe-west1.firebasedatabase.app/post.json";
    const req = await axios.post(url, models.value);

    if (req.status === 200) {
      isAddedBlog.value = true;
      info.value.msg = "Added your blog ";
      info.value.color = "green";
      formRef.value.reset();

      setTimeout(() => {
        isAddedBlog.value = false;
      }, 2000);
    }
  } catch (error) {
    isAddedBlog.value = true;
    info.value.msg = `Woops! ${error.message}`;
    info.value.color = "red";
    formRef.value.reset();

    setTimeout(() => {
      isAddedBlog.value = false;
    }, 2000);
  }
};

const validate = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    addPost();
  }
};
</script>
<style scoped>
.preview {
  box-shadow: 0 0 1rem #ec407a;
}
</style>
