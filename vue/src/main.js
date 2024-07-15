// FILE: main.js

import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'

// Import Quasar css
import 'quasar/dist/quasar.css'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    lang: quasarLang,
})


// createPlugin();

myApp.mount('#app')

function createPlugin() {

    //*在网页上插入插件
    const 随机id = 插件id + '_' + Math.random().toString().substring(2);
    const 包裹元素 = $(插件模板);
    //*从自身以及子元素中找到id为插件id的元素,并将其id改为随机id
    包裹元素.filter("#" + 插件id).add(包裹元素.find("#" + 插件id)).first().attr("id", 随机id);

    $(插入位置选择器).first().prepend(包裹元素);


}