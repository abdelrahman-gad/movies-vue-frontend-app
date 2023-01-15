import { createStore } from 'vuex';
import auth from './modules/auth/index';
import movies from './modules/movies/index';
import {
    LOADING_SPINNER_SHOW_MUTATION,
} from './storeconstants';

const store = createStore({
    modules: {
        auth,
        movies
    },
    state() {
        return {
            showLoading: false,
        };
    },
    mutations: {
        [LOADING_SPINNER_SHOW_MUTATION](state, payload) {
            state.showLoading = payload;
        },
    },
});

export default store;
