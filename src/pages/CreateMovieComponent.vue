<template>
  <div>
    <h3>Create Movie</h3>
    <form @submit.prevent="onCreateMovie()">
      <div v-if="errors">
        <div v-for="(valuesArr, prop) in errors" :key="prop">
          <div
            class="alert alert-danger"
            v-for="(item, index) of valuesArr"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" v-model="description"></textarea>
      </div>
      <div class="form-group">
        <label>File</label>
        <input
          class="form-control"
          type="file"
          ref="file"
          @change="handleImageUpload($event)"
        />
      </div>
      <div class="form-group">
        <label>Category</label>
        <select
          class="form-control"
          aria-label="Default select example"
          v-model="category_id"
        >
          <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Create Post</button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  CREATE_MOVIE_ACTION,
  GET_ALL_CATEGORIES_ACTION,
  GET_ALL_CATEGORIES_GETTER,
  LOADING_SPINNER_SHOW_MUTATION,
} from "@/store/storeconstants";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { toast } from 'vue3-toastify';
export default {
  name: "CreateMovieComponent",
  data() {
    return {
      name: "",
      description: "",
      image: "",
      category_id: "",
      errors: {},
    };
  },
  mounted() {
    this.onGettingCategories();
  },
  computed: {
    ...mapGetters("movies", {
      categories: GET_ALL_CATEGORIES_GETTER,
    }),
  },
  methods: {
    ...mapActions("movies", {
      createMovie: CREATE_MOVIE_ACTION,
      getAllCategories: GET_ALL_CATEGORIES_ACTION,
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async onGettingCategories() {
      this.getAllCategories();
    },
    async onCreateMovie() {
      this.showLoading(true);
      try {
        await this.createMovie({
          name: this.name,
          description: this.description,
          category_id: this.category_id,
          image: this.image,
        });
       toast("Movie Was Created Successfully !", {
          autoClose: 1000,
        });
        this.$router.push("/movies");
      } catch (errors) {
        this.errors = errors;
        this.showLoading(false);
      }
      this.showLoading(false);
    },
    handleImageUpload() {
      this.image = this.$refs.file.files[0];
    },
  },
};
</script>
