<template>
  <div>
    <div>
      <h2>Movies</h2>
      <div class="row">
        <div class="col-sm-3">
          <router-link :to="'movies/create'" class="btn btn-info mb-3"
            >Create Movie</router-link
          >
        </div>
        <div class="col-sm-9 pull-right">
          <a class="link"></a>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-9">
          <div class="row">
            <div
              class="card col-sm-6 mb-5"
              style="width: 16rem"
              v-for="movie in movies"
              :key="movie.id"
            >
              <img
                :src="`${api_base_domain}/${movie.image}`"
                class="card-img-top"
                :alt="movie.name"
              />
              <div class="card-body">
                <h5 class="card-title">{{ movie.name }}</h5>
                <p class="card-text">
                  {{ movie.description }}
                </p>
              </div>

              <div class="card-body">
                <router-link
                  :to="`movies/edit/${movie.id}`"
                  class="btn btn-success mr-2"
                  >Edit</router-link
                >
                <button
                  @click="onDeleteMovie(movie.id)"
                  class="btn btn-danger mr-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <article class="card-group-item">
            <header class="card-header">
              <h6 class="title">Choose Movie Category</h6>
            </header>
            <div class="filter-content">
              <div class="card-body">
                <label
                  class="form-check"
                  v-for="category in categories"
                  :key="category.id"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadio"
                    :value="category.id"
                    @change="onGettingMoviesByCategory(category.id)"
                  />
                  <span class="form-check-label"> {{ category.name }} </span>
                </label>
              </div>
              <!-- card-body.// -->
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { toast } from "vue3-toastify";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  IS_USER_AUTHENTICATE_GETTER,
  GET_USER_TOKEN_GETTER,
  GET_ALL_MOVIES_ACTION,
  GET_MOVIES_GETTER,
  GET_MOVIES_BY_CATEGORY_ACTION,
  DELETE_MOVIE_ACTION,
  GET_ALL_CATEGORIES_GETTER,
  GET_ALL_CATEGORIES_ACTION,
} from "../store/storeconstants";
export default {
  name: "MoviesComponent",
  data() {
    return {
      api_base_domain: process.env.VUE_APP_API_BASE_DOMAIN,
    };
  },
  computed: {
    ...mapGetters("auth", {
      isAuthenticated: IS_USER_AUTHENTICATE_GETTER,
      userToken: GET_USER_TOKEN_GETTER,
    }),
    ...mapGetters("movies", {
      movies: GET_MOVIES_GETTER,
      categories: GET_ALL_CATEGORIES_GETTER,
    }),
  },
  mounted() {
    this.onGettingMovies();
    this.onGettingCategories();
  },
  methods: {
    ...mapActions("movies", {
      getAllMovies: GET_ALL_MOVIES_ACTION,
      getMoviesByCategory: GET_MOVIES_BY_CATEGORY_ACTION,
      deleteMovie: DELETE_MOVIE_ACTION,
      getAllCategories: GET_ALL_CATEGORIES_ACTION,
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async onGettingMovies() {
      this.showLoading(true);
      await this.getAllMovies();
      this.showLoading(false);
    },
    async onGettingMoviesByCategory(id) {
      this.showLoading(true);
      this.getMoviesByCategory({ id });
      this.showLoading(false);
    },
    async onGettingCategories() {
      await this.getAllCategories();
    },
    async onDeleteMovie(id) {
      if (confirm("Are you sure you want to delete this element ? ")) {
        this.deleteMovie({ id });
        window.location.reload();
        toast("Movie Was Deleted Successfully !", {
          autoClose: 1000,
        });
      }
    },
  },
};
</script>

<style scoped></style>
