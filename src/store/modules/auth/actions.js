import Axios from 'axios';
import {
    LOGIN_ACTION,
    AUTO_LOGIN_ACTION,
    LOGOUT_ACTION,
    SET_USER_TOKEN_DATA_MUTATION,
    SIGNUP_ACTION
} from '../../storeconstants';

export default {
    [LOGOUT_ACTION](context) {
        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
            email: null,
            token: null,
        });
        localStorage.removeItem('userData');
    },
    async [LOGIN_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password
        };
        let response = '';
        try {
            response = await Axios.post(`${process.env.VUE_APP_API_BASE_URL}/login`, postData);
        } catch (err) {
            let errorMessage = err.response.data.message;
            throw errorMessage;
        }
        if (response.status === 200) {
            let userData = {
                token: response.data.authorisation.token,
                email: postData.email
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
        }
    },

    async [SIGNUP_ACTION](context, payload) {
        let postData = {
            name:payload.name,
            email: payload.email,
            password: payload.password
        };
        let response = '';
        try {
            response = await Axios.post(`${process.env.VUE_APP_API_BASE_URL}/register`, postData);
        } catch (err) {
            let errorMessage = err.response.data.message;
            throw errorMessage;
        }
        if (response.status === 200) {
            if (response.data.status == "failed") {
                throw response.data.message;   
            } else {
                let userData = {
                    token: response.data.authorisation.token,
                    email: response.data.user.email
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);     
            }
        }
    },

    [AUTO_LOGIN_ACTION](context) {
        let userDataString = localStorage.getItem('userData');
        if (userDataString) {
            let userData = JSON.parse(userDataString);
            context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
        }
    },
};
