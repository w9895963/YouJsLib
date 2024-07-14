/**========================================================================
 **                           滚动到顶部按钮
 *?  见标题
 *========================================================================**/

export default async function createPlugin({
    按钮显示位置 = "200",
    距离右侧 = "100",
    距离底部 = "100",
} = {}) {

    var 依赖 = 'https://cdn.jsdelivr.net/gh/w9895963/YouJsLib@1.0.8/dist/deps/ImportVueUiInjectDependencies.js';
    await (await import(依赖)).default();
    const { createApp, ref } = Vue;


    const id = "app_scrollTop";

    $('body').append('<div id="' + id + '"></div>');




    createApp({
        template: `
            <el-backtop :right="${距离右侧}" :bottom="${距离底部}" :visibility-height="${按钮显示位置}" />
    `,
    }).use(ElementPlus).mount("#" + id);


}