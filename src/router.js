import { createRouter, createWebHistory } from 'vue-router';
import store from './store/store';
import { IS_USER_AUTHENTICATE_GETTER } from './store/storeconstants';

const LoginComponent = () => import('./pages/LoginComponent.vue');
const SignupComponent = () => import('./pages/SignupComponent.vue');
const HomeComponent = () => import('./pages/HomeComponent.vue');
const MoviesComponent = () => import('./pages/MoviesComponent.vue');
const CreateMovieComponent = () => import('./pages/CreateMovieComponent.vue');
const EditMovieComponent = () => import('./pages/EditMovieComponent.vue');
const NotFoundComponent = () => import('./pages/NotFoundComponent.vue');
const routes = [
    { path: '', redirect: '/movies', component: HomeComponent },
    { path: '/login', component: LoginComponent, meta: { auth: false } },
    { path: '/signup', component: SignupComponent, meta: { auth: false } },
    {
        path: '/movies',
        component: MoviesComponent,
        meta: { auth: true },

    },
    {
        path: '/movies/create',
        component: CreateMovieComponent
    },
    {
        path: '/movies/edit/:id',
        component: EditMovieComponent,
        props: true
    },
    {
        path: "/:NotFound(.*)*",
        component: NotFoundComponent,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
    if (
        'auth' in to.meta &&
        to.meta.auth &&
        !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/login');
    } else if (
        'auth' in to.meta &&
        !to.meta.auth &&
        store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/movies');
    } else {
        next();
    }
});

export default router;
