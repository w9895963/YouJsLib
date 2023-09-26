





export default async function () {
    var vueUi注入依赖库列表 = [
        'https://unpkg.com/jquery.min.js',//jquery
        'https://unpkg.com/vue@3/dist/vue.global.prod.js',//vue
        'https://unpkg.com/element-plus/dist/index.css',//elementUI.css
        'https://unpkg.com/element-plus/dist/index.full.min.js',//elementUI.js
    ];


    var fn = await import("https://jsd.onmicrosoft.cn/gh/w9895963/YouJsLib@1.0.7/dist/Functions.js")
    
    await fn.AddToHeadIfNotExist(vueUi注入依赖库列表);


    window.Enumerable = (await import('https://cdnjs.cloudflare.com/ajax/libs/linq.js/4.0.1/linq.min.js')).default;//linq.js

}