// AUTH actions
export const SIGNUP_ACTION = '[actions] signup user';
export const LOGIN_ACTION = '[actions] login user';
export const LOGOUT_ACTION = '[actions] Logout User';
export const AUTO_LOGIN_ACTION = '[actions] Auth AUto Login';
// AUTH Mutations
export const SET_USER_TOKEN_DATA_MUTATION =
    '[mutations] set user token data';
export const LOADING_SPINNER_SHOW_MUTATION =
    '[mutations] show loading spinner';
// AUTH Getterss
export const GET_USER_TOKEN_GETTER = '[getters] auth user token';
export const IS_USER_AUTHENTICATE_GETTER = '[getters] is user authenticated';

// Movies Action 
export const CREATE_MOVIE_ACTION = '[action] create movie';
export const GET_ALL_MOVIES_ACTION = '[action] get all movies';
export const GET_SINGLE_MOVIE_ACTION = '[action] get all single movie ';
export const UPDATE_MOVIE_ACTION = '[action] update movie ';
export const DELETE_MOVIE_ACTION = '[action] delete movie';
export const GET_MOVIES_BY_CATEGORY_ACTION = '[action] get movies by category';
// Movies Mutations
export const SET_MOVIES_MUTATION = '[mutations] set movies';
export const SET_SINGLE_MOVIE_MUTATION = '[mutations] set single movie ';
// Movies Getters
export const GET_MOVIES_GETTER = '[getters] get movies from store';
export const GET_SINGLE_MOVIE_GETTER = '[getters] get single movie s from store';

// Categories Action ;
export const GET_ALL_CATEGORIES_ACTION = '[action] get all categories';
// Categories Mutations
export const SET_ALL_CATEGORIES_MUTATION = '[mutations] set all categories';
// Categories Getters
export const GET_ALL_CATEGORIES_GETTER = '[getters] get all categories from store';

