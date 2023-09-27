





export default async function () {
    var vueUi注入依赖库列表 = [
        'https://cdn.staticfile.org/jquery/3.7.1/jquery.min.js',//jquery
        'https://cdn.staticfile.org/vue/3.3.4/vue.global.prod.min.js',//vue
        'https://cdn.staticfile.org/element-plus/2.3.14/index.min.css',//elementUI.css
        'https://cdn.staticfile.org/element-plus/2.3.14/index.full.min.js',//elementUI.js
    ];
    


    var fn = await import("https://jsd.onmicrosoft.cn/gh/w9895963/YouJsLib@1.0.7/dist/Functions.js")

    await fn.AddToHeadIfNotExist(vueUi注入依赖库列表);


    window.Enumerable = (await import('https://cdn.staticfile.org/linq.js/4.0.1/linq.min.js')).default;//linq.js

}