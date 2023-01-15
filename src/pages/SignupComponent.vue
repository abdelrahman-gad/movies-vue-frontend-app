<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Signup</h3>
          <hr />
        </div>
        <div v-if="errors">
          <div v-for="(valuesArr, prop) in errors" :key="prop" >
            <div class="alert alert-danger" v-for="(item,index) of valuesArr" :key="index" >
               {{ item}}
            </div>
          </div>
        </div>

        <form @submit.prevent="onSignup()">
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model.trim="name" />
          </div>

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
            <button type="submit" class="btn btn-primary mr-5">Signup</button>
              <router-link class="btn btn-secondary pull-right" :to="`login`"
              >Already have account ?</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { toast } from "vue3-toastify";
import { mapActions, mapMutations } from "vuex";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  SIGNUP_ACTION,
} from "../store/storeconstants";
export default {
  name: "SignupComponent",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      errors: {}
    };
  },
  beforeRouteLeave() {
    console.log(this.$store);
  },
  beforeRouteEnter(_, _1, next) {
    next((vm) => {
      console.log(vm.$store.state.auth);
    });
  },
  methods: {
    ...mapActions("auth", {
      signup: SIGNUP_ACTION,
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async onSignup() {
      this.showLoading(true);
      try {
        await this.signup({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        toast("Creatd account succcessfully !", {
          autoClose: 1000,
        });
      } catch (errors) {
        this.errors = errors;
        this.showLoading(false);
      }
        this.showLoading(false);
        this.$router.push("/movies");
    },
  },
};
</script>
