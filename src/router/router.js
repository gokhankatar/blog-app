import { createWebHistory, createRouter } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import AddBlog from "../views/AddBlog.vue";
import MyBlogs from "../views/MyBlogs.vue";
import SingleBlog from "../views/SingleBlog.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MyBlogs,
        meta: {
            title: 'My Blogs',
            layout: MainLayout,
            public: true
        }
    },
    {
        path: '/addBlog',
        name: 'AddBlog',
        component: AddBlog,
        meta: {
            title: 'Add Blog',
            layout: MainLayout,
            public: true
        }
    },
    {
        path: '/myBlogs',
        name: 'MyBlogs',
        component: MyBlogs,
        meta: {
            title: 'My Blogs',
            layout: MainLayout,
            public: true
        }
    },
    {
        path: '/blog/:id',
        name: 'Blog Detail',
        component: SingleBlog,
        meta: {
            title: 'Blog Detail',
            layout: MainLayout,
            public: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = 'Blog App | ' + to.meta.title;
    next();
});

export default router;