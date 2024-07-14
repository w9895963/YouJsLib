/**========================================================================
 **                           表格过滤器
 *?  可以根据表格中的某一列的值来过滤表格中项目
 *?  例如:表格中有一列是城市名,可以根据城市名来过滤表格中的项目
 *========================================================================**/




export default async function createPlugin({
    //用来指定插件的在网页中的位置
    插入位置选择器 = ".result-wrap",

    //用来在插件外层增加其他网页元素,通过id来指定插件的位置
    插件模板 = `<div id="app" style="display: inline-block;"> <div>`,
    插件id = "app",

    //用来指定要处理的表格
    表格选择器 = "table.result-tab",
    过滤列索引 = 2,
    是否忽略最后行 = true,
} = {}) {



    var 依赖 = 'https://cdn.jsdelivr.net/gh/w9895963/YouJsLib@1.0.8/dist/deps/ImportVueUiInjectDependencies.js';
    await (await import(依赖)).default();
    const { createApp, ref } = Vue;




    const 随机id = 插件id + '_' + Math.random().toString().substring(2);
    const 包裹元素 = $(插件模板);
    包裹元素.filter("#" + 插件id).add(包裹元素.find("#" + 插件id)).first().attr("id", 随机id);
    $(插入位置选择器).first().prepend(包裹元素);



    //*处理表格信息
    var 表格 = $(表格选择器).first();

    //获取所有行
    var 所有行枚举 = 表格.children("tbody").children("tr");
    var 行数 = 所有行枚举.length;
    所有行枚举 = Enumerable.from(所有行枚举).skip(1);
    if (是否忽略最后行) {
        所有行枚举 = 所有行枚举.take(行数 - 2);
    }


    var 所有格子文本枚举 = Enumerable.from(所有行枚举).select(it => it.children[过滤列索引].innerText);
    var 城市名行枚举 = Enumerable.from(所有格子文本枚举).distinct().orderBy(it => it);
    //根据城市名分类行("ApplyHide")
    var 城市对应的所有行枚举 = 城市名行枚举.select(name => {
        var 城市名行 = Enumerable.from(所有行枚举).where(it => it.children[过滤列索引].innerText == name).toArray();
        return {
            城市名: name,
            行: 城市名行,
        };
    });



    //申请显示属性名
    var requestVisibleAttr = "requestVisible";


    //*加上默认隐藏属性
    所有行枚举.forEach(it => {
        var $it = $(it);
        if ($it.attr(requestVisibleAttr) == null) {
            $it.attr(requestVisibleAttr, "0");
        }
    });



    var 上次选中的城市名列表 = [];
    //方法:处理行的显示隐藏
    function ToggleRowVisibility(城市名列表) {
        //判断需要隐藏还是显示
        var 需要隐藏的城市名枚举 = Enumerable.from(上次选中的城市名列表).except(城市名列表);
        var 需要显示的城市名枚举 = Enumerable.from(城市名列表).except(上次选中的城市名列表);
        上次选中的城市名列表 = 城市名列表;

        //隐藏
        城市对应的所有行枚举.where(it => 需要隐藏的城市名枚举.any(name => it.城市名.includes(name))).forEach(it => applyHideRow(it.行));

        //显示
        城市对应的所有行枚举.where(it => 需要显示的城市名枚举.any(name => it.城市名.includes(name))).forEach(it => applyShowRow(it.行));
    }


    //方法:申请隐藏
    function applyHideRow($row) {
        $row = $($row);

        var showIt = $row.attr(requestVisibleAttr);


        $row.attr(requestVisibleAttr, parseInt(showIt) - 1);

    }

    //方法:申请显示
    function applyShowRow($row) {
        $row = $($row);
        var Row = $row.attr(requestVisibleAttr);


        $row.attr(requestVisibleAttr, parseInt(Row) + 1);

    }


    //方法:根据数据改变决定行的显示或隐藏
    function updateRowVisibility() {
        //找到所有有属性的行
        var 所有有属性的行Jq = $(`tr[${requestVisibleAttr}]`);
        //分组
        var 需要隐藏的行枚举 = Enumerable.from(所有有属性的行Jq).where(it => $(it).attr(requestVisibleAttr) == "0");
        var 需要显示的行枚举 = Enumerable.from(所有有属性的行Jq).where(it => $(it).attr(requestVisibleAttr) != "0");

        //如果有需要隐藏的行,则隐藏,否则显示所有
        if (需要显示的行枚举.any()) {
            需要隐藏的行枚举.forEach(it => $(it).hide());
            需要显示的行枚举.forEach(it => $(it).show());
        } else {
            Enumerable.from(所有有属性的行Jq).forEach(it => $(it).show());
        }
    }





    createApp({
        setup() {
            const value = ref([]);
            const options = 城市名行枚举.toArray();
            function change(value) {
                ToggleRowVisibility(value);
                updateRowVisibility();
            }
            return {
                value,
                options,
                change,
            };
        },
        template: `
            <el-select
                v-model="value"
                multiple
                filterable
                allow-create
                default-first-option
                :reserve-keyword="false"
                clearable
                @change="change"
            >
                <el-option v-for="item in options" :key="item" :label="item" :value="item" />
            </el-select>
        `
    })
        .use(ElementPlus)
        .mount(`#${随机id}`);

};