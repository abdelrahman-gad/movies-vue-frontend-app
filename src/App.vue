<template>
  <TheNavigation />
  <the-loader v-if="showLoading"></the-loader>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
import { mapState } from "vuex";
import { defineAsyncComponent } from "vue";
import { AUTO_LOGIN_ACTION } from "./store/storeconstants";
import 'vue3-toastify/dist/index.css';
const TheLoader = defineAsyncComponent(() =>
  import("./components/TheLoader.vue")
);
export default {
  name: "App",
  computed: {
    ...mapState({
      showLoading: (state) => state.showLoading,
      autoLogout: (state) => state.auth.autoLogout,
    }),
  },
  components: {
    TheNavigation,
    TheLoader,
  },
  created() {
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
  },
};
</script>
