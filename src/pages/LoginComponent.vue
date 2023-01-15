<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Login</h3>
          <hr />
        </div>
        <div class="alert alert-danger" v-if="error">
          {{ error }}
        </div>
        <form @submit.prevent="onLogin()">
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model.trim="email" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model.trim="password"
            />
          </div>

          <div class="my-3">
            <button type="submit" class="btn btn-primary mr-5">Login</button>
            <router-link class="btn btn-secondary pull-right" :to="`signup`"
              >create account ?</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import { toast } from "vue3-toastify";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  LOGIN_ACTION,
} from "../store/storeconstants";
export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    ...mapActions("auth", {
      login: LOGIN_ACTION,
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async onLogin() {
      this.showLoading(true);
      try {
        await this.login({
          email: this.email,
          password: this.password,
        });
        toast("Logged in successfully !", {
          autoClose: 1000,
        });
      } catch (error) {
        this.error = error;
        this.showLoading(false);
      }
      this.showLoading(false);
      this.$router.push("/movies");
    },
  },
};
</script>
