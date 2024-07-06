import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router/router';
import store from './store/pinia';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

loadFonts();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

// create directive
app.directive('colorful', {
    beforeMount(el, binding, vnode) {
        // random color
        el.style.color = '#' + Math.random().toString().slice(2, 8);
    }
});

app.use(vuetify);
app.use(router);
app.use(pinia);
app.mount('#app');
