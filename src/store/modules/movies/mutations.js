import {
    SET_MOVIES_MUTATION,
    SET_ALL_CATEGORIES_MUTATION,
    SET_SINGLE_MOVIE_MUTATION
} from '../../storeconstants';

export default {
    [SET_MOVIES_MUTATION](state, payload) {
        state.movies = payload;
    },
    [SET_SINGLE_MOVIE_MUTATION](state, payload) {
        state.movie = payload;
    },
    [SET_ALL_CATEGORIES_MUTATION](state, payload) {
        state.categories = payload;
    },
};
