/**========================================================================
 *                  * *开发网站插件的时候所用的依赖* *
 *========================================================================**/





export default async function () {


    const jqueryLink = 'https://cdn.staticfile.org/jquery/3.7.1/jquery.min.js';
    const VueLink = 'https://cdn.staticfile.org/vue/3.3.4/vue.global.prod.min.js';
    const elementUILink = 'https://cdn.staticfile.org/element-plus/2.3.14/index.full.min.js';
    const elementUICssLink = 'https://cdn.staticfile.org/element-plus/2.3.14/index.min.css';



    //如果没有jquery,则加载jquery
    if (typeof $ == 'undefined') {
        await new Promise((resolve) => {
            var script = document.createElement('script');
            script.src = jqueryLink;
            script.type = 'text/javascript';
            script.addEventListener('load', resolve);
            document.head.append(script);
        })
    }
    await new Promise((resolve) => {
        var script = document.createElement('script');
        script.src = VueLink;
        script.type = 'text/javascript';
        script.addEventListener('load', resolve);
        document.head.append(script);
    })
    await new Promise((resolve) => {
        var script = document.createElement('script');
        script.src = elementUILink;
        script.type = 'text/javascript';
        script.addEventListener('load', resolve);
        document.head.append(script);
    })
    await new Promise((resolve) => {
        var script = document.createElement('link');
        script.href = elementUICssLink;
        script.rel = "stylesheet";
        script.addEventListener('load', resolve);
        document.head.append(script);
    })



    window.Enumerable = (await import('https://cdn.staticfile.org/linq.js/4.0.1/linq.min.js')).default;//linq.js

}