/**========================================================================
 *                  * *生成一个重新统计表格某列数据的按钮* *
 *========================================================================**/




export default async function createPlugin({
    //用来指定插件的在网页中的位置
    插入位置选择器 = ".result-wrap",

    //用来在插件外层增加其他网页元素,通过id来指定插件的位置
    插件模板 = `<div id="app" style="display: inline-block; margin-left: 5px;"> <div>`,
    插件id = "app",

    //用来指定要处理的表格
    表格选择器 = "table.result-tab",
    过滤列索引 = [3, 4, 5],
} = {}) {
    //*加载依赖
    var 依赖 = 'https://jsd.onmicrosoft.cn/gh/w9895963/YouJsLib@1.0.8/dist/deps/ImportVueUiInjectDependencies.js';
    await (await import(依赖)).default();
    const { createApp, ref } = Vue;


    //*在网页上插入插件
    const 随机id = 插件id + '_' + Math.random().toString().substring(2);
    const 包裹元素 = $(插件模板);
    //*从自身以及子元素中找到id为插件id的元素,并将其id改为随机id
    包裹元素.filter("#" + 插件id).add(包裹元素.find("#" + 插件id)).first().attr("id", 随机id);

    $(插入位置选择器).first().prepend(包裹元素);






    createApp({
        setup() {
            function click() {
                Enumerable.from(过滤列索引)
                    .select(i => {
                        //选择显示的 tr 下 第i个 td 
                        const 选择器 = `tr:visible td:nth-child(${i + 1})`;
                        const 所有格子 = $(表格选择器).first().find(选择器);
                        return 所有格子;
                    })
                    .forEach(所有格子 => {
                        //将格子最后一个的内容替换为其余所有的统计结果
                        const 所有要统计的格子 = 所有格子.not(所有格子.last());
                        const 最后的格子 = 所有格子.last();
                        function 计算总数(格子) {
                            const 第一格的所有文字 = 格子.first().text();
                            const 总数 = Enumerable.from(格子).select(i => $(i).text()).sum(i => parseFloat(i));
                            //如果有小数,就只保留两位小数
                            总数 = 总数 % 1 == 0 ? 总数 : 总数.toFixed(2);
                            //将第一格的所有文字里的数值替换为总数
                            总数 = 第一格的所有文字.replace(/[\d\.]+/, 总数);
                            return 总数;
                        }
                        最后的格子.text(计算总数(所有要统计的格子));
                    });
            }
            return {
                click,
            };
        },
        template: /* html */`
                <el-button @click="click" > 重新统计 </el-button>
            `
    })
        .use(ElementPlus)
        .mount(`#${随机id}`);


}