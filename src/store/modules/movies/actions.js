import { axiosAuthenticatedInstance, axiosAuthenticatedMultiPartFormInstance } from '../../../services/AxiosInstances';

import {
    CREATE_MOVIE_ACTION,
    GET_ALL_MOVIES_ACTION,
    SET_MOVIES_MUTATION,
    GET_ALL_CATEGORIES_ACTION,
    SET_ALL_CATEGORIES_MUTATION,
    GET_SINGLE_MOVIE_ACTION,
    SET_SINGLE_MOVIE_MUTATION,
    UPDATE_MOVIE_ACTION,
    DELETE_MOVIE_ACTION,
    GET_MOVIES_BY_CATEGORY_ACTION
} from '../../storeconstants';
export default {
    async [CREATE_MOVIE_ACTION](context, payload) {
        let formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value);
        });
        let response = '';
        try {
            response = await axiosAuthenticatedInstance.post(`${process.env.VUE_APP_API_BASE_URL}/movies`, formData);
        } catch (err) {
            let errorMessage = err.response.data.message;
            throw errorMessage;
        }
        if (response.status === 200) {
            if (response.data.status == 'failed') {
                throw response.data.message;
            }
        }
    },
    async [UPDATE_MOVIE_ACTION](context, payload) {
        let formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('_method', 'put');
        let response = '';
        try {
            response = await axiosAuthenticatedMultiPartFormInstance.post(`${process.env.VUE_APP_API_BASE_URL}/movies/${payload.id}`, formData);
        } catch (err) {
            let errorMessage = err.response.data.message;
            throw errorMessage;
        }
        if (response.status === 200) {
            if (response.data.status == 'failed') {
                throw response.data.message;
            }
        }
    },
    async [DELETE_MOVIE_ACTION](context, payload) {
        let formData = new FormData()
        formData.append('_method', 'delete');
        let response = '';
        try {
            response = await axiosAuthenticatedInstance.post(`${process.env.VUE_APP_API_BASE_URL}/movies/${payload.id}`, formData );
        } catch (err) {
            let errorMessage = err.response.data.message;
            throw errorMessage;
        }
        if (response.status === 200) {
            if (response.data.status == 'failed') {
                throw response.data.message;
            }
        }
    },
    async [GET_ALL_MOVIES_ACTION](context) {
        let response = await axiosAuthenticatedInstance.get(`${process.env.VUE_APP_API_BASE_URL}/movies`);
        let movies = response.data.message;
        context.commit(SET_MOVIES_MUTATION, movies);
    },
    async [GET_MOVIES_BY_CATEGORY_ACTION](context, payload) {
        let response = await axiosAuthenticatedInstance.get(`${process.env.VUE_APP_API_BASE_URL}/moviesByCategory/${payload.id}`);
        let movies = response.data.message;
        context.commit(SET_MOVIES_MUTATION, movies);
    },
    async [GET_SINGLE_MOVIE_ACTION](context, payload) {
        let response = await axiosAuthenticatedInstance.get(`${process.env.VUE_APP_API_BASE_URL}/movies/${payload.id}`);
        let movie = response.data.message;
        context.commit(SET_SINGLE_MOVIE_MUTATION, movie);
        return movie;
    },
    async [GET_ALL_CATEGORIES_ACTION](context) {
        let response = await axiosAuthenticatedInstance.get(`${process.env.VUE_APP_API_BASE_URL}/category`);
        let categories = response.data.message;
        context.commit(SET_ALL_CATEGORIES_MUTATION, categories);
    }
};
