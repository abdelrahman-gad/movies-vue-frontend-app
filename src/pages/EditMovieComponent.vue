<template>
  <div>
    <h3>Edit Movie</h3>
    <form @submit.prevent="onUpdateMovie()">
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
        <img
          :src="`${api_base_domain}/${movie.image}`"
          width="150"
          height="150"
          :alt="image"
        />
        <br />
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
        <button type="submit" class="btn btn-primary">Update Movie</button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  GET_ALL_CATEGORIES_ACTION,
  GET_ALL_CATEGORIES_GETTER,
  GET_SINGLE_MOVIE_ACTION,
  GET_SINGLE_MOVIE_GETTER,
  LOADING_SPINNER_SHOW_MUTATION,
  UPDATE_MOVIE_ACTION,
} from "@/store/storeconstants";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { toast } from "vue3-toastify";
export default {
  name: "EditMovieComponent",
  props: ["id"],
  data() {
    return {
      name: "",
      description: "",
      image: "",
      category_id: "",
      errors: {},
      api_base_domain: process.env.VUE_APP_API_BASE_DOMAIN,
    };
  },
  mounted() {
    this.onGettingMovie();
    this.onGettingCategories();
  },
  computed: {
    ...mapGetters("movies", {
      categories: GET_ALL_CATEGORIES_GETTER,
      movie: GET_SINGLE_MOVIE_GETTER,
    }),
  },
  methods: {
    ...mapActions("movies", {
      getMovie: GET_SINGLE_MOVIE_ACTION,
      getCategories: GET_ALL_CATEGORIES_ACTION,
      updateMovie: UPDATE_MOVIE_ACTION,
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async onGettingMovie() {
      let movie = await this.getMovie({ id: this.id });
      this.name = movie.name;
      this.description = movie.description;
      this.image = movie.image;
      this.category_id = movie.category_id;
    },
    async onGettingCategories() {
      this.getCategories();
    },
    async onUpdateMovie() {
      this.showLoading(true);
      try {
        await this.updateMovie({
          id: this.id,
          name: this.name,
          description: this.description,
          category_id: this.category_id,
          image: this.image,
        });
        this.$router.push("/movies");
        toast("Movie Was Updated Successfully !", {
          autoClose: 1000,
        });
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
