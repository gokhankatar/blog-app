import { defineStore } from "pinia";
import router from "../router/router";

const store = defineStore('piniaStore', {
    state() {
        return {
            mode: 'dark',
            isActive: 'myBlogs'
        }
    },
    actions: {
        switchMode() {
            this.mode === 'dark'
                ? this.mode = 'light'
                : this.mode = 'dark';
        },
        activeMyBlogs() {
            this.isActive = 'myBlogs';
            router.replace('/myBlogs');
        },
        activeAddBlog() {
            this.isActive = 'addBlog';
            router.replace('/addBlog');
        }
    },
    persist: true
});

export default store;