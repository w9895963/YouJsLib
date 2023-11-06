/**========================================================================
 **                           一件省份开关
 *?  
 *?  
 *========================================================================**/





export default function loadPlugin({
    插入位置 = '.result-wrap',
} = {}) {



    async function createPlugin() {

        var 依赖 = 'https://jsd.onmicrosoft.cn/gh/w9895963/YouJsLib@1.0.27/dist/deps/ImportVueUiInjectDependencies.js';
        await (await import(依赖)).default();
        const { createApp, ref } = Vue;


        const 新增组件 = $('<div id="app" />');
        $(插入位置).prepend(新增组件);


        const Comp = {
            template: /* template */`
                <el-input
                    v-model="input"
                    @input="change"
                    ref="inputRef"
                    :clearable="true"
                    placeholder="省份"
                    style="display: inline-block; width: 200px;"
                />
                <el-button-group>
                    <el-button type="primary" @click="add">新增</el-button>
                    <el-button type="primary" @click="remove">停止</el-button>
                    <el-button type="primary" @click="update">批量</el-button>
                    <el-button type="primary" @click="refresh">刷新</el-button>
                </el-button-group>
                `,
            setup() {
                const input = ref('');
                var allLines = null;
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
                    ClickToPost();
                }
                function remove() {
                    SetMatchLineToValue(0);
                    ClickToPost();
                }
                function update() {
                    SetMatchLineToValue(1, true);
                    ClickToPost();

                }
                function refresh() {
                    //获得当前页地址
                    var url = window.location.href;
                    //刷新
                    window.location.href = url;

                }
                function change() {
                    // 选择每一行的第三个td
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
                    add,
                    remove,
                    update,
                    change,
                    refresh,
                    input,
                };
            },
        };



        createApp({
            components: {
                Comp,
            },
            template: /* template */`
            <Comp/>
        `,
            setup() {
            },
        }).use(ElementPlus).mount(新增组件[0]);

    }


    (new Promise(async (resolve) => {
        await createPlugin();
        resolve();
    })).then();





}
