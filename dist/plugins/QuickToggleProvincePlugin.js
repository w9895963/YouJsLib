/**========================================================================
 **                         * *快捷工具栏-省份开关* *
 *?  
 *?  
 *========================================================================**/





export default function loadPlugin({
    插入位置 = '.result-wrap',
    搜索框长度 = 320,
} = {}) {



    async function createPlugin() {

        var 依赖 = 'https://jsd.onmicrosoft.cn/gh/w9895963/YouJsLib@v1.2.2/dist/deps/ImportVueUiInjectDependencies.js';
        await (await import(依赖)).default();
        const { createApp, ref } = Vue;


        const 新增组件 = $('<div id="app" />');
        $(插入位置).prepend(新增组件);


        const Comp = {
            template: /* template */`
                <div style="display: inline-block;width: ${搜索框长度}px">
                    <el-input
                        v-model="input"
                        type="textarea"
                        autosize="true"
                        @change="change"
                        ref="inputRef"
                        placeholder="省份"
                        
                    />
                </div>
                <el-button-group >
                    <el-tooltip content="清空输入">
                        <el-button type="primary" @click="()=>{input='';change();}">清空</el-button>
                    </el-tooltip>
                    <el-tooltip content="将选中省份打开,其余不变">
                        <el-button type="primary" @click="add">打开</el-button>
                    </el-tooltip>
                    <el-tooltip content="将选中省份关闭,其余不变">
                        <el-button type="primary" @click="remove">关闭</el-button>
                    </el-tooltip>
                    <el-tooltip content="将选中省份打开,其余所有省份关闭">
                        <el-button type="primary" @click="update">批量更新</el-button>
                    </el-tooltip>
                    <el-tooltip content="提交修改">
                        <el-button type="primary" @click="ClickToPost">提交</el-button>
                    </el-tooltip>
                    <el-tooltip content="刷新网页,不会触发提交">
                        <el-button type="primary" @click="refresh">刷新</el-button>
                    </el-tooltip>
                </el-button-group>
                `,
            setup() {
                const input = ref('');
                var allLines = null;
                function formatter(value) {
                    const provinces = Enumerable.from($('.result-content tbody>tr'))
                        .skip(1) //去掉第一个
                        .select(it => $(it).find('td:nth-child(3)>span:first').text()).toArray();

                    var pr = Enumerable.from(provinces).where(x => value.includes(x)).toArray();
                    //将省份用逗号隔开
                    pr = pr.join(",");
                    return pr;
                }
                function SetMatchLineToValue(valToSet, resetAllToZero = false) {
                    if (allLines == null) {
                        allLines = Enumerable.from($('.result-content tbody>tr'))
                            .skip(1) //去掉第一个
                            .select(it => ({
                                text: $(it).find('td:nth-child(3)>span:first').text(),
                                val: $(it).children().eq(3).find('input')[0],
                            })).toArray();
                    }
                    if (resetAllToZero) {
                        Enumerable.from(allLines).forEach(x => {
                            x.val.value = 0;
                        });
                    }
                    Enumerable.from(allLines).where(x => input.value.includes(x.text))
                        .forEach(x => {
                            x.val.value = valToSet;
                        });
                }
                function ClickToPost() {
                    const button = document.querySelector('input#ContentPlaceHolder1_ContentPlaceHolder1_Button1');
                    const clickEvent = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    });
                    button.dispatchEvent(clickEvent);
                }
                function add() {
                    SetMatchLineToValue(1);
                }
                function remove() {
                    SetMatchLineToValue(0);
                }
                function update() {
                    SetMatchLineToValue(1, true);
                }
               
                function refresh() {
                    //获得当前页地址
                    var url = window.location.href;
                    //刷新
                    window.location.href = url;

                }
                function change() {
                    //格式化
                    input.value = formatter(input.value);
                    // 高亮
                    $('.result-content tbody>tr').each(function () {
                        var v = $(this).find('td:nth-child(3)>span:first').text();
                        //v去掉空白
                        v = v.replace(/\s+/g, "");
                        //如果输入含有该省份
                        if (v.length > 0 && input.value.includes(v)) {
                            //高亮
                            $(this)[0].style.backgroundColor = "lightsteelblue";
                        }
                        else {
                            $(this)[0].style.backgroundColor = "inherit";
                        }
                    });
                }

                return {
                    formatter,
                    add,
                    remove,
                    update,
                    ClickToPost,
                    change,
                    refresh,
                    input,
                };
            },
        };



        createApp({
            components: {Comp, },
            template: /* template */` <Comp/>`,
            setup() {},
        }).use(ElementPlus).mount(新增组件[0]);

    }


    (new Promise(async (resolve) => {
        await createPlugin();
        resolve();
    })).then();





}
