import {
    GET_MOVIES_GETTER,
    GET_ALL_CATEGORIES_GETTER,
    GET_SINGLE_MOVIE_GETTER
} from '../../storeconstants';

export default {
    [GET_MOVIES_GETTER](state) {
        return state.movies;
    },
    [GET_SINGLE_MOVIE_GETTER](state) {
        return state.movie;
    },
    [GET_ALL_CATEGORIES_GETTER](state) {
        return state.categories;
    }
};
