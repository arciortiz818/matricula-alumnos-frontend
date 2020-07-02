import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requiresAuth: false,
    },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/programas',
    name: 'Programas',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/Programas.vue'),
  },
  {
    path: '/materias',
    name: 'Materias',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/Materias.vue'),
  },
  {
    path: '/estudiantes',
    name: 'Estudiantes',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/Estudiantes.vue'),
  },
  {
    path: '/ficha-estudiante',
    name: 'FichaEstudiante',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/FichaEstudiante.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const user = window.localStorage.getItem('nombre_usuario');
  const token = window.localStorage.getItem('token');
  const requiresAuth = to.matched.some((r) => r.meta.requiresAuth);
  if (requiresAuth) {
    if (user === null && token === null) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
